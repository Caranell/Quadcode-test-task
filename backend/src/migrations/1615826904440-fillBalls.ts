import { MigrationInterface, QueryRunner } from 'typeorm';
import { Ball } from '@/balls/entities/ball.entity';
import { BallSize } from '@/common/constants/BallSizes';
import { BallPatterns } from '@/common/constants/BallPatternts';

export class fillBalls1615826380637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ballRepo = queryRunner.connection.getRepository(Ball);

    await ballRepo.insert([
      {
        color: 'blue',
        size: BallSize.SMALL,
        pattern: BallPatterns.DOTS,
        hasHoles: false,
      },
      {
        color: 'yellow',
        size: BallSize.BIG,
        pattern: BallPatterns.LINES,
        hasHoles: false,
      },
      {
        color: 'green',
        size: BallSize.MEDIUM,
        pattern: BallPatterns.LINES,
        hasHoles: true,
      },
      {
        color: 'blue',
        size: BallSize.SMALL,
        pattern: null,
        hasHoles: true,
      },
      {
        color: 'white',
        size: BallSize.SMALL,
        pattern: null,
        hasHoles: false,
      },
      {
        color: 'white',
        size: BallSize.BIG,
        pattern: BallPatterns.DOTS,
        hasHoles: false,
      },
      {
        color: 'red',
        size: BallSize.BIG,
        pattern: null,
        hasHoles: false,
      },
      {
        color: 'red',
        size: BallSize.SMALL,
        pattern: BallPatterns.DOTS,
        hasHoles: true,
      },
      {
        color: 'red',
        size: BallSize.SMALL,
        pattern: BallPatterns.LINES,
        hasHoles: true,
      },
      {
        color: 'red',
        size: BallSize.SMALL,
        pattern: BallPatterns.DOTS,
        hasHoles: false,
      },
      {
        color: 'purple',
        size: BallSize.SMALL,
        pattern: BallPatterns.DOTS,
        hasHoles: true,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE `ball`');
  }
}
