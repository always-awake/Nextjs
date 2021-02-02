import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id)

    if (!movie) {
      throw new NotFoundException(`Movie whit Id:${id} not found`)
    }

    return movie
  }

  deleteOne(id: number) {
    this.movies.filter((movie) => movie.id !== id)
  }

  createMovie(movieInfo: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieInfo
    })
  }

  updateMovie(id: number, movieInfo){
    const movieToUpdate = this.getOne(id)
    this.deleteOne(id)
    this.movies.push({...movieToUpdate, ...this.updateMovie})
  }
}
