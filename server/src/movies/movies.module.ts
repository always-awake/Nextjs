import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService] // controller에 injection됨 (dependency injection)
})
export class MoviesModule {}
