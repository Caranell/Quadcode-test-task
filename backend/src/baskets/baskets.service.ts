import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { Basket } from './entities/basket.entity';

@Injectable()
export class BasketsService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
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
      throw new NotFoundException(`Basket with id ${id} not found`);
    }
    return basket;
  }
}
