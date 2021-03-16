import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BallsService } from './balls.service';
import { BallsController } from './balls.controller';
import { Ball } from './entities/ball.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ball])],
  controllers: [BallsController],
  providers: [BallsService],
  exports: [BallsService],
})
export class BallsModule {}
