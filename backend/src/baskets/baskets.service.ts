import { Repository, Not } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll(): Promise<Basket[]> {
    return this.basketRepository.find({
      relations: ['balls'],
      order: {
        id: 'ASC',
      },
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

  async checkDuplicateEntityExists(
    originalEntityId: string,
    data: UpdateBasketDto,
  ): Promise<void> {
    const duplicateBasket = await this.basketRepository.findOne({
      where: {
        ...data,
        id: Not(originalEntityId),
      },
    });

    if (duplicateBasket) {
      throw new ConflictException(`Basket with these settings already exists`);
    }
  }

  async modify(id: string, updateBasketDto: UpdateBasketDto): Promise<Basket> {
    const basket = await this.basketRepository.preload({
      id: Number(id),
      ...updateBasketDto,
    });

    if (!basket) {
      throw new NotFoundException(`Basket with id "${id}" not found`);
    }

    await this.checkDuplicateEntityExists(id, updateBasketDto);

    // remove all balls from basket on settings change
    return this.basketRepository.save({ ...basket, balls: [] });
  }

  async putMatchingBalls(id: string): Promise<Basket> {
    const basket = await this.basketRepository.findOne(id);

    if (!basket) {
      throw new NotFoundException(`Basket with id "${id}" not found`);
    }

    const { id: _, ...basketData } = basket;

    const balls = await this.ballRepository.find({
      where: basketData,
    });

    return this.basketRepository.save({ ...basket, balls });
  }
}
