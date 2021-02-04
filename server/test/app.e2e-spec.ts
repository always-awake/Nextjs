import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { isRgbColor } from 'class-validator'

describe('Test AppController (E2E)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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

    it('Test POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Title',
          year: 2000,
          genres: ['Test Genres']
        })
        .expect(201)
    })

    it('Test DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  })
})