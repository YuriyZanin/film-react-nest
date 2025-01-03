import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { GetFilmDTO } from '../films/dto/films.dto';
import { Film } from '../films/models/film';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmMapperFn(): (Film) => GetFilmDTO {
    return (root) => {
      return {
        id: root._id,
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
    const items = await this.filmModel.find({});
    const total = items.length;
    return {
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    try {
      const film = await this.filmModel.findOne({ _id: id });
      return this.getFilmMapperFn()(film);
    } catch {
      throw new NotFoundException(`Фильм с id ${id} не найден в БД`);
    }
  }

  async takingSeat(
    filmId: string,
    sessionIndex: string,
    place: string,
  ): Promise<void> {
    try {
      await this.filmModel.updateOne(
        { _id: filmId },
        { $push: { [`schedule.${sessionIndex}.taken`]: place } },
      );
    } catch (error) {
      new ConflictException(
        'При сохранении данных о бронировании места произошли ошибки',
      );
    }
  }
}
