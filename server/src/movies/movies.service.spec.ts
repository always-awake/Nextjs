import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService); // 테스트 코드에서 service에 접근이 가능하다.
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test getAll function', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne', () => {
    it('should return a movie', () => {
      const anyMovie = {
        title: 'Test Mobie title',
        genres: ['test genres'],
        year: 2000,
      }
      service.createMovie(anyMovie)
      const movie = service.getOne(1)
      
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
    })

    it('should throw 404 error', () => {
      const anyId = 10000
      try {
        service.getOne(anyId);
      } catch(e) {
        
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual(`Movie whit Id:${anyId} not found`)
      }
    })
  })
});
