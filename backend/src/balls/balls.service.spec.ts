import { Repository } from 'typeorm';
import { NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BallPatterns } from '@/common/constants/BallPatternts';
import { BallSize } from '@/common/constants/BallSizes';
import { Basket } from '@/baskets/entities/basket.entity';
import { Ball } from '@/balls/entities/ball.entity';
import { BallsService } from './balls.service';

const ballsFixture: Ball[] = [
  {
    id: 1,
    color: 'yellow',
    size: BallSize.BIG,
    pattern: BallPatterns.LINES,
    hasHoles: false,
    basket: null,
  },
  {
    id: 2,
    color: 'green',
    size: BallSize.MEDIUM,
    pattern: BallPatterns.LINES,
    hasHoles: true,
    basket: null,
  },
  {
    id: 4,
    color: 'blue',
    size: BallSize.SMALL,
    pattern: null,
    hasHoles: true,
    basket: null,
  },
];

const [ballFixture] = ballsFixture;

const basketFixture: Basket = {
  id: 4,
  color: 'blue',
  size: BallSize.SMALL,
  pattern: null,
  hasHoles: true,
  balls: [],
};

describe('Ball services', () => {
  let service: BallsService;
  let repository: Repository<Ball>;
  let basketRepository: Repository<Basket>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BallsService,
        {
          provide: getRepositoryToken(Ball),
          useValue: {
            find: jest.fn().mockResolvedValue(ballsFixture),
            findOne: jest.fn().mockResolvedValue(ballFixture),
            save: jest.fn(),
            preload: jest.fn().mockResolvedValue(ballFixture),
          },
        },
        {
          provide: getRepositoryToken(Basket),
          useValue: {
            find: jest.fn().mockResolvedValue([basketFixture]),
            findOne: jest.fn().mockResolvedValue(basketFixture),
          },
        },
      ],
    }).compile();

    service = module.get<BallsService>(BallsService);
    repository = module.get<Repository<Ball>>(getRepositoryToken(Ball));
    basketRepository = module.get<Repository<Basket>>(
      getRepositoryToken(Basket),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all balls', async () => {
      const balls = await service.findAll();

      expect(ballsFixture).toEqual(balls);
    });
  });

  describe('findOne', () => {
    it('should return one ball by id', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const { id } = ballFixture;

      const foundBall = await service.findOne(`${id}`);

      expect(foundBall).toEqual(ballFixture);
      expect(repoSpy).toBeCalledWith(`${id}`, expect.any(Object));
    });

    it('should throw error when ball not found', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const { id } = ballFixture;
      (repository.findOne as jest.Mock).mockReturnValue(undefined);

      try {
        await service.findOne(`${id}`);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(repoSpy).toBeCalledWith(`${id}`, expect.any(Object));
        expect(error.message).toEqual(expect.stringContaining('not found'));
      }
    });
  });

  describe('findMatchingBasket', () => {
    it('should throw error if basket not found', async () => {
      const { id, basket, ...ballData } = ballFixture;
      (basketRepository.findOne as jest.Mock).mockReturnValue(null);

      try {
        await service.findMatchingBasket(id, ballData);
      } catch (error) {
        expect(error).toBeInstanceOf(PreconditionFailedException);
        expect(error.message).toEqual(
          expect.stringContaining('matching basket for ball'),
        );
      }
    });
  });

  describe('put ball in basket', () => {
    it('should return basket with specified ball in it', async () => {
      const [, , ball] = ballsFixture;
      (repository.findOne as jest.Mock).mockReturnValue(ball);
      (basketRepository.findOne as jest.Mock).mockReturnValue({
        ...basketFixture,
        balls: [ball],
      });

      const matchedBasket = await service.putInBasket(`${ball.id}`);

      expect(matchedBasket).toEqual({ ...basketFixture, balls: [ball] });
    });
  });
});
