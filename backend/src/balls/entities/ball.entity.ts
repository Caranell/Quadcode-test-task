import { Basket } from '@/baskets/entities/basket.entity';
import { BallConfiguration } from '@/common/entities/BallCofiguration.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ball extends BallConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Basket,
    basket => basket.balls,
  )
  basket: Basket;
}
