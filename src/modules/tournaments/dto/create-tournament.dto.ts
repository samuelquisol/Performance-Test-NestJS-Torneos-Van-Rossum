import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({
    description: 'The name of the Tournament',
    example: 'Esports Championship 2024',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The date of the Tournament',
    example: '2024-08-15',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Flag to indicate if the Tournament is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'List of player IDs associated with the Tournament',
    example: [
      'e6a66b4f-ffe4-42ae-9983-c42669e0b9b9',
      '9691afe2-e1ef-47db-8434-67d2f92a803f',
    ],
  })
  @IsArray()
  @IsNotEmpty()
  playerIds: string[];

  @ApiProperty({
    description: 'List of result IDs associated with the Tournament',
    example: ['updatable1', 'updatable2'],
  })
  @IsArray()
  @IsNotEmpty()
  resultIds: string[];
}
