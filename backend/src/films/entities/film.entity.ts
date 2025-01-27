import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNumber, IsString, IsArray, Min, Max } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column('text', { array: true })
  @IsArray()
  tags: string[];

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedule: Schedule[];
}
