import { Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(){
    return 'This will return movie list'
  }

  @Get("/:id")
  getOne(@Param("id") movieId: string) {
    return `This return one movie with the id: ${movieId}`
  }

  @Post()
  createMovie() {
    return 'This will create a movie'
  }

  @Delete("/Lid")
  removeMovie(@Param("id") movieId: string) {
    return `This will delete a movie with the id: ${movieId}`
  }

  @Patch()
  patchMovie(@Param("id") movieId: string) {
    return `This will patch a movie with the id: ${movieId}`
  }

}
