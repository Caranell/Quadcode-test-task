import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BallsService } from './balls.service';
import { Ball } from './entities/ball.entity';
import { Basket } from '@/baskets/entities/basket.entity';

@ApiTags('balls')
@Controller('balls')
export class BallsController {
  constructor(private readonly ballsService: BallsService) {}
  @Get()
  findAll(): Promise<Ball[]> {
    return this.ballsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ball> {
    return this.ballsService.findOne(id);
  }

  @Post(':id/put-in-basket')
  putInBasket(@Param('id') id: string): Promise<Basket> {
    return this.ballsService.putInBasket(id);
  }
}
