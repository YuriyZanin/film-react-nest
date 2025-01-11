import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';
import { GetFilmDTO } from '../films/dto/films.dto';
import { FilmsRepository } from './films.repository';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export class FilmsPostgresRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  private getFilmMapperFn(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAll(): Promise<{ total: number; items: GetFilmDTO[] }> {
    const items = await this.filmsRepository.find({
      relations: { schedule: true },
    });
    const total = items.length;
    return {
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    try {
      const film = await this.filmsRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
      return this.getFilmMapperFn()(film);
    } catch {
      throw new NotFoundException(`Фильм с id ${id} не найден в БД`);
    }
  }

  async takingSeat(
    filmId: string,
    sessionId: string,
    place: string,
  ): Promise<void> {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { filmId: filmId, id: sessionId },
      });
      schedule.taken =
        schedule.taken.trim().length === 0
          ? place
          : schedule.taken + `,${place}`;

      await this.scheduleRepository.save(schedule);
    } catch {
      throw new ConflictException(
        'При сохранении данных о бронировании места произошли ошибки',
      );
    }
  }
}
