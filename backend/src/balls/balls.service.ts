import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ball } from './entities/ball.entity';
import { Basket } from '@/baskets/entities/basket.entity';

@Injectable()
export class BallsService {
  constructor(
    @InjectRepository(Ball)
    private readonly ballRepository: Repository<Ball>,
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
  ) {}

  findAll(): Promise<Ball[]> {
    return this.ballRepository.find({
      relations: ['basket'],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Ball> {
    const ball = await this.ballRepository.findOne(id, {
      relations: ['basket'],
    });

    if (!ball) {
      throw new NotFoundException(`Ball with id "${id}" not found`);
    }

    return ball;
  }

  async putInBasket(id: string): Promise<Basket> {
    const ball = await this.ballRepository.findOne(id);

    if (!ball) {
      throw new NotFoundException(`Ball with id "${id}" not found`);
    }

    const { id: _, ...ballData } = ball;

    const matchingBasket = await this.basketRepository.findOne({
      where: ballData,
      relations: ['balls'],
    });

    if (!matchingBasket) {
      throw new PreconditionFailedException(
        `Couldn't find matching basket for ball "${id}"`,
      );
    }

    await this.ballRepository.save({
      ...ball,
      basket: matchingBasket,
    });

    return this.basketRepository.findOne(matchingBasket.id, {
      relations: ['balls'],
    });
  }
}
