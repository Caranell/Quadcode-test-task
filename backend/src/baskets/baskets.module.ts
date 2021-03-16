import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BasketsService } from './baskets.service';
import { BasketsController } from './baskets.controller';
import { Basket } from './entities/basket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Basket])],
  controllers: [BasketsController],
  providers: [BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}
