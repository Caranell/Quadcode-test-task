import {
  HttpServer,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { BallSize } from '@/common/constants/BallSizes';
import { BallPatterns } from '@/common/constants/BallPatternts';
import { Basket } from '@/baskets/entities/basket.entity';
import { BasketsModule } from '@/baskets/baskets.module';
import { UpdateBasketDto } from '@/baskets/dto/update-basket.dto';
import ormConfig from '../../ormconfig';

const basketFixture: Basket = {
  id: 1,
  color: 'blue',
  size: BallSize.SMALL,
  pattern: BallPatterns.DOTS,
  hasHoles: false,
  balls: [],
};

describe('BasketsModule (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BasketsModule,
        TypeOrmModule.forRoot({ ...ormConfig, host: '10.0.0.10' }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET ALL [GET /]', () => {
    return request(httpServer)
      .get('/baskets')
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('GET ONE [GET /:id]', () => {
    return request(httpServer)
      .get('/baskets/1')
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining({ id: 1 }));
      });
  });

  it('UPDATE BASKET [PUT /:id]', () => {
    const color = 'asdfqwer';
    return request(httpServer)
      .put('/baskets/1')
      .send({ color } as UpdateBasketDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining({ color }));
      });
  });

  it('PUT BALLS IN BASKET (POST /:id/put-matching-balls]', () => {
    const {} = basketFixture;
    return request(httpServer)
      .post('/baskets/1/put-matching-balls')
      .then(({ body }) => {
        expect(body?.balls?.length).toBeGreaterThanOrEqual(0);
      });
  });
});
