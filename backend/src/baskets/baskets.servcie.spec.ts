import { BallPatterns } from '../common/constants/BallPatternts';
import { BallSize } from '../common/constants/BallSizes';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketsService } from './baskets.service';
import { Basket } from './entities/basket.entity';
import { Ball } from '@/balls/entities/ball.entity';

const basketsFixture: Basket[] = [
  {
    id: 1,
    color: 'yellow',
    size: BallSize.BIG,
    pattern: BallPatterns.LINES,
    hasHoles: false,
    balls: [],
  },
  {
    id: 2,
    color: 'green',
    size: BallSize.MEDIUM,
    pattern: BallPatterns.LINES,
    hasHoles: true,
    balls: [],
  },
  {
    id: 4,
    color: 'blue',
    size: BallSize.SMALL,
    pattern: null,
    hasHoles: true,
    balls: [],
  },
];

const ballFixture: Ball = {
  id: 1,
  color: 'yellow',
  size: BallSize.BIG,
  pattern: BallPatterns.LINES,
  hasHoles: false,
  basket: null,
};

const [basketFixture] = basketsFixture;

describe('Basket services', () => {
  let service: BasketsService;
  let repository: Repository<Basket>;
  let ballRepo: Repository<Ball>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketsService,
        {
          provide: getRepositoryToken(Basket),
          useValue: {
            find: jest.fn().mockResolvedValue(basketsFixture),
            findOne: jest.fn().mockResolvedValue(basketFixture),
            save: jest.fn(),
            preload: jest.fn().mockResolvedValue(basketFixture),
          },
        },
        {
          provide: getRepositoryToken(Ball),
          useValue: {
            find: jest.fn().mockResolvedValue([ballFixture]),
          },
        },
      ],
    }).compile();

    service = module.get<BasketsService>(BasketsService);
    repository = module.get<Repository<Basket>>(getRepositoryToken(Basket));
    ballRepo = module.get<Repository<Ball>>(getRepositoryToken(Ball));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all baskets', async () => {
      const baskets = await service.findAll();
      expect(basketsFixture).toEqual(baskets);
    });
  });

  describe('findOne', () => {
    it('should return one basket by id', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const { id } = basketFixture;

      const foundBasket = await service.findOne(`${id}`);

      expect(foundBasket).toEqual(basketFixture);
      expect(repoSpy).toBeCalledWith(`${id}`, expect.any(Object));
    });

    it('should throw error when basket not found', async () => {
      const repoSpy = jest.spyOn(repository, 'findOne');
      const { id } = basketFixture;
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

  describe('checkDuplicateExists', () => {
    it('should throw error on duplicate', async () => {
      const { id, balls, ...basketFixtureData } = basketFixture;

      const [updatedBasket] = basketsFixture;
      const { id: _, balls: __, ...updatedBasketData } = updatedBasket;

      (repository.findOne as jest.Mock).mockReturnValue(basketFixtureData);

      try {
        await service.checkDuplicateEntityExists(`${id}`, updatedBasketData);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toEqual(
          expect.stringContaining('already exists'),
        );
      }
    });
  });

  describe('modify', () => {
    const { id } = basketFixture;
    const [, updatedBasket] = basketsFixture;
    const { id: _, balls: __, ...updatedBasketData } = updatedBasket;

    it('should update basket by id', async () => {
      (repository.preload as jest.Mock).mockReturnValue({
        id,
        ...updatedBasketData,
      });
      (repository.findOne as jest.Mock).mockReturnValue(null);
      (repository.save as jest.Mock).mockReturnValue({
        id,
        ...updatedBasketData,
      });

      const result = await service.modify(`${id}`, updatedBasketData);

      expect(result).toMatchObject({ id, ...updatedBasketData });
    });
  });

  describe('put balls in basket', () => {
    const { id } = basketFixture;

    it('should return basket with matched balls in it', async () => {
      (repository.save as jest.Mock).mockReturnValue({
        ...basketFixture,
        balls: [ballFixture],
      });
      const basket = await service.putMatchingBalls(`${id}`);

      expect(basket).toEqual({ ...basketFixture, balls: [ballFixture] });
    });
  });
});
