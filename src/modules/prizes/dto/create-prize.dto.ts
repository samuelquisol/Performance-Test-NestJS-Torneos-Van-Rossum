import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, IsDate } from 'class-validator';

export class CreatePrizeDto {
  @ApiProperty({ description: 'The name of the prize', example: 'Free T-shirt' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the prize', example: 'A cool T-shirt with our logo' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The quantity of the prize in stock', example: 10 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ description: 'The last claimed date of the prize', example: '2024-06-15T10:30:00Z' })
  @IsDate()
  lastClaimedAt: Date;
}
