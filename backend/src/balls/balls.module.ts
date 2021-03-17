import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BallsService } from './balls.service';
import { BallsController } from './balls.controller';
import { Ball } from './entities/ball.entity';
import { Basket } from '@/baskets/entities/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ball, Basket])],
  controllers: [BallsController],
  providers: [BallsService],
})
export class BallsModule {}
