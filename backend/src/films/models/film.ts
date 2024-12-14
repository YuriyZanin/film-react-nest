import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number },
  rows: { type: Number },
  seats: { type: Number },
  price: { type: Number },
  taken: { type: [String], default: [] },
});

const FilmSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

const Film = mongoose.model('Film', FilmSchema);

export default Film;
