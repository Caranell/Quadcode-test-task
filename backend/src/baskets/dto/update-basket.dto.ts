import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BallSize } from '@/common/constants/BallSizes';
import { BallPatterns } from '@/common/constants/BallPatternts';

export class UpdateBasketDto {
  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsEnum(BallSize)
  readonly size?: BallSize;

  @IsOptional()
  @IsEnum(BallPatterns)
  readonly pattern?: BallPatterns;

  @IsOptional()
  @IsBoolean()
  readonly hasHoles?: boolean;
}
