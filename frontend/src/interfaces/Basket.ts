import { BasicConfig } from './BasicConfig';
import { Ball } from './Ball';

export interface Basket extends BasicConfig {
  balls?: Ball[];
}
