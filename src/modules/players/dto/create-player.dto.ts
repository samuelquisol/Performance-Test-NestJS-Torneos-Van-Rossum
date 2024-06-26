import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  @ApiProperty({
    description: 'The name of the Player',
    example: 'Samuel Quintero Solís',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The date when the Player was born',
    example: '2005-03-31',
  })
  @IsDate()
  @IsNotEmpty()
  age: Date;

  @ApiProperty({
    description: 'Flag to indicate if the Player is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'List of tournament ID associated with the Player',
    example: 'updatable1',
  })
  @IsArray()
  @IsNotEmpty()
  tournamentId: string;
}
