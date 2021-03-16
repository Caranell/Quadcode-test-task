import { BasicConfig } from './BasicConfig';
import { Basket } from './Basket';

export interface Ball extends BasicConfig {
  basket: Basket;
}
