import { Injectable } from '@nestjs/common';
import {  Movie } from './types/movie.entity'

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id))
  }

  deleteOne(id: string): Movie[] {
    return this.movies.filter((movie) => movie.id !== parseInt(id))
  }

  createMovie(movieInfo) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieInfo
    })
  }
}
