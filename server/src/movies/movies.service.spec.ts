import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { isRgbColor } from 'class-validator';
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

  describe('Test deleteOne', () => {
    it('should deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Test genres'],
        year: 2000,
      })

      const allMoviesBeforDelete = service.getAll().length
      service.deleteOne(1)
      const allMoviesAfterDelete = service.getAll().length

      expect(allMoviesAfterDelete).toBeLessThan(allMoviesBeforDelete)
    })

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('Test createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length
      service.createMovie({
        title: 'Test Movie',
        genres: ['Test genres'],
        year: 2000,
      })
      const afterCreate = service.getAll().length

      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('Test updateMovie', () => {
    it('should update a movie', () => {
      const any_title = 'Updated Test'
      service.createMovie({
        title: 'Test Movie',
        genres: ['Test genres'],
        year: 2000,
      })
      service.updateMovie(1, { title: any_title })
      const movie = service.getOne(1);
      
      expect(movie.title).toEqual(any_title)
    })

    it('should throw a NotFound Error', () => {
      try {
        service.updateMovie(999, {})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
    
  })
  
  
  
});
