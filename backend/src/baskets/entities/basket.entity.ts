import { Ball } from '@/balls/entities/ball.entity';
import { BallConfiguration } from '@/common/entities/BallCofiguration.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Basket extends BallConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => Ball,
    ball => ball.basket,
  )
  balls: Ball[];
}
