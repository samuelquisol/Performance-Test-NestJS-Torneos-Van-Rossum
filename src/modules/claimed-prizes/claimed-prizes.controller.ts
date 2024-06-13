import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ClaimedPrizesService } from './claimed-prizes.service';
import { ClaimedPrize } from './entities/claimed-prize.entity';
import { CreateClaimedPrizeDto } from './dto/create-claimed-prize.dto';

@ApiTags('Claimed Prizes')
@Controller('claimed-prizes')
export class ClaimedPrizesController {
  constructor(private readonly claimedPrizesService: ClaimedPrizesService) {}

  @Post()
  @ApiOperation({ summary: 'Claim a Prize for a Player' })
  @ApiResponse({
    status: 201,
    description: 'The Prize has been successfully claimed.',
    type: ClaimedPrize,
  })
  async claimPrize(@Body() createClaimedPrizeDto: CreateClaimedPrizeDto): Promise<ClaimedPrize> {
    return this.claimedPrizesService.create(createClaimedPrizeDto);
  }
}
