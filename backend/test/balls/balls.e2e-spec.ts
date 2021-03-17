import { HttpServer, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BallsModule } from '@/balls/balls.module';
import { Ball } from '@/balls/entities/ball.entity';
import { BallSize } from '@/common/constants/BallSizes';
import { BallPatterns } from '@/common/constants/BallPatternts';
import ormConfig from '../../ormconfig';

const ballFixture: Ball = {
  id: 1,
  color: 'blue',
  size: BallSize.SMALL,
  pattern: BallPatterns.DOTS,
  hasHoles: false,
  basket: null,
};

describe('BallsModule (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BallsModule,
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
      .get('/balls')
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('GET ONE [GET /:id]', () => {
    return request(httpServer)
      .get('/balls/1')
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining({ id: 1 }));
      });
  });

  it('PUT IN BASKET (POST /:id/put-in-basket]', () => {
    const { id, basket, ...ballData } = ballFixture;
    return request(httpServer)
      .post('/balls/1/put-in-basket')
      .then(({ body }) => {
        expect(body).toEqual(expect.objectContaining(ballData));
      });
  });
});
