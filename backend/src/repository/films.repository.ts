import { Injectable } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { GetFilmDTO } from '../films/dto/films.dto';
import Film from '../films/models/film';

@Injectable()
export class FilmsRepository {
  constructor(private connection: Mongoose) {}

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
    const items = await Film.find({});
    const total = await Film.countDocuments({});
    return {
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }
}
