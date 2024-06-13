import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaimedPrize } from './entities/claimed-prize.entity';
import { CreateClaimedPrizeDto } from './dto/create-claimed-prize.dto';

@Injectable()
export class ClaimedPrizesService {
  constructor(
    @InjectRepository(ClaimedPrize)
    private readonly claimedPrizeRepository: Repository<ClaimedPrize>,
  ) {}

  async create(createClaimedPrizeDto: CreateClaimedPrizeDto): Promise<ClaimedPrize> {
    const claimedPrize = this.claimedPrizeRepository.create(createClaimedPrizeDto);
    return this.claimedPrizeRepository.save(claimedPrize);
  }
  
}
