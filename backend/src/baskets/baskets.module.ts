import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { Basket } from './entities/basket.entity';
import { Ball } from '@/balls/entities/ball.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket, Ball])],
  controllers: [BasketsController],
  providers: [BasketsService],
})
export class BasketsModule {}
