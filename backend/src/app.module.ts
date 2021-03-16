import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketsController } from './baskets/baskets.controller';
import { BallsController } from './balls/balls.controller';
import { BasketsModule } from './baskets/baskets.module';
import { BallsModule } from './balls/balls.module';
import ormConfig from '../ormconfig';

@Module({
  imports: [BasketsModule, BallsModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [BasketsController, BallsController],
})
export class AppModule {}
