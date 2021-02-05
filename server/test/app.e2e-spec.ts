import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { isRgbColor } from 'class-validator'

describe('Test AppController (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }))
    await app.init();
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // url 요청 테스트 (Controller, Service, Pipe의 결과에 대한 테스팅)
      .get('/')
      .expect(200)
      .expect('home page')
  })

  describe('/movies', () => {
    it('Test GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([])
    })

    it('Test POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Title',
          year: 2000,
          genres: ['Test Genres']
        })
        .expect(201)
    })

    it('Test POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Title',
          year: 2000,
          genres: ['Test Genres'],
          other: 'thing',
        })
        .expect(400)
    })

    it('Test DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  })

  describe('Test /movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    })

    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404)
    })
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200)
    })
    it('DELETE', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    })
  })
  
})