import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { Ball } from './entities/ball.entity';

@Injectable()
export class BallsService {
  constructor(
    @InjectRepository(Ball)
    private readonly ballRepository: Repository<Ball>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Ball[]> {
    const { limit, offset } = paginationQuery;

    return this.ballRepository.find({
      relations: ['basket'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Ball> {
    const basket = await this.ballRepository.findOne(id, {
      relations: ['basket'],
    });

    if (!basket) {
      throw new NotFoundException(`Ball with id ${id} not found`);
    }
    return basket;
  }
}
