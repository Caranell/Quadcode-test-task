import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BallsService } from './balls.service';
import { PaginationQueryDto } from '@/common/dto/PaginationQueryDto';
import { Ball } from './entities/ball.entity';

@ApiTags('balls')
@Controller('balls')
export class BallsController {
  constructor(private readonly ballsService: BallsService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Ball[]> {
    return this.ballsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ball> {
    return this.ballsService.findOne(id);
  }
}
