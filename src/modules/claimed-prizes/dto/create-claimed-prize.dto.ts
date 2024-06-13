import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateClaimedPrizeDto {
  @ApiProperty({
    description: 'The ID of the player',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  playerId: string;

  @ApiProperty({
    description: 'The ID of the prize',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @IsNotEmpty()
  prizeId: string;
}
