import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  
  // service를 수동으로 import 하지 않음 (@Injectable() 데코레이터 참고)
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(){
    return this.movieService.getAll
  }
  @Get('search')
  search(@Query('title') movieTitle) {
    return `We are searching for a movie with a title: ${movieTitle}`
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return this.movieService.getOne(movieId)
  }

  @Post()
  createMovie(@Body() movieInfo) {
    return this.movieService.createMovie(movieInfo)
  }

  @Delete(':id')
  removeMovie(@Param('id') movieId: string) {
    return this.movieService.deleteOne(movieId)
  }

  @Patch()
  patchMovie(@Param('id') movieId: string, @Body() movieInfo) {
    console.log(`This will patch a movie with the id: ${movieId}`)
    return {
      updatedMovieId: movieId,
      ...movieInfo
    }
  }
}
