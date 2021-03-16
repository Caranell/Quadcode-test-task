import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { BasketsService } from './baskets.service';
import { Basket } from './entities/basket.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Ball } from '@/balls/entities/ball.entity';

@ApiTags('balls')
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

  @Patch(':id')
  modify(
    @Param('id') id: string,
    @Body() updateBasketDto: UpdateBasketDto,
  ): Promise<Basket> {
    return this.basketsService.modify(id, updateBasketDto);
  }

  // naming advices appreciated :P
  @Post(':id/put-matching-balls')
  putMatchingBalls(@Param('id') id: string): Promise<Ball[]> {
    return this.basketsService.putMatchingBalls(id);
  }
}
