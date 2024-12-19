import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getAll();
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
