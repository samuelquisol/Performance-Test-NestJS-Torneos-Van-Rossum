import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimedPrizesService } from './claimed-prizes.service';
import { ClaimedPrizesController } from './claimed-prizes.controller';
import { ClaimedPrize } from './entities/claimed-prize.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaimedPrize]),
  ],
  controllers: [ClaimedPrizesController],
  providers: [ClaimedPrizesService],
})
export class ClaimedPrizesModule {}
