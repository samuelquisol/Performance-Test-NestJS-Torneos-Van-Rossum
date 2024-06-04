import { IsNotEmpty, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResultDto {
  @ApiProperty({
    description: 'The date when the Result was published',
    example: '2005-03-31',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'Flag to indicate if the Result is available',
    example: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'List of tournament ID associated with the Result',
    example: 'updatable1',
  })
  @IsNumber()
  @IsNotEmpty()
  tournamentId: string;
}
