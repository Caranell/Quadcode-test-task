import { Controller, Get, Param, Query } from '@nestjs/common';

import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { BasketsService } from './baskets.service';
import { Basket } from './entities/basket.entity';

@Controller('baskets')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Basket[]> {
    return this.basketsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Basket> {
    return this.basketsService.findOne(id);
  }
}
