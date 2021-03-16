import { Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { Basket } from './entities/basket.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Ball } from '@/balls/entities/ball.entity';

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Ball)
    private readonly ballRepository: Repository<Ball>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Basket[]> {
    const { limit, offset } = paginationQuery;
    return this.basketRepository.find({
      relations: ['balls'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Basket> {
    const basket = await this.basketRepository.findOne(id, {
      relations: ['balls'],
    });

    if (!basket) {
      throw new NotFoundException(`Basket with id "${id}" not found`);
    }
    return basket;
  }

  async modify(id: string, updateBasketDto: UpdateBasketDto): Promise<Basket> {
    const basket = await this.basketRepository.preload({
      id: Number(id),
      ...updateBasketDto,
    });

    if (!basket) {
      throw new NotFoundException(`Basket with id "${id}" not found`);
    }
    const { id: _, ...basketData } = basket;

    const duplicateBasket = await this.basketRepository.find({
      where: basketData,
    });

    if (duplicateBasket) {
      throw new ConflictException(`Basket with these settings already exists`);
    }

    // remove all balls from basket on settings change
    return this.basketRepository.save({ ...basket, balls: [] });
  }

  async putMatchingBalls(id: string): Promise<Ball[]> {
    const basket = await this.basketRepository.findOne(id);

    if (!basket) {
      throw new NotFoundException(`Basket with id "${id}" not found`);
    }

    const { id: _, ...basketData } = basket;

    const balls = await this.ballRepository.find({
      where: basketData,
    });

    await this.basketRepository.save({ ...basket, balls });

    return balls;
  }
}
