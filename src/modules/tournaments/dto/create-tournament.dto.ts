import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
  @ApiProperty({
    description: 'The name of the tournament',
    example: 'Esports Championship 2024',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The date of the tournament',
    example: '2024-08-15',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Flag to indicate if the tournament is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
