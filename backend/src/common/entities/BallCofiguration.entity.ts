import { Column } from 'typeorm';
import { BallSize } from '@/common/constants/BallSizes';
import { BallPatterns } from '@/common/constants/BallPatternts';

export class BallConfiguration {
  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: BallSize,
  })
  size: BallSize;

  @Column({
    type: 'enum',
    nullable: true,
    enum: BallPatterns,
  })
  pattern?: BallPatterns;

  @Column({
    default: false,
  })
  hasHoles: boolean;
}
