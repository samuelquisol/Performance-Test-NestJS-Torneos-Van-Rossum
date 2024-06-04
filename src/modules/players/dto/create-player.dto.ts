import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
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
}
