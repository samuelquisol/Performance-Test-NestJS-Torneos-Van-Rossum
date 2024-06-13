import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizesService } from './prizes.service';
import { PrizesController } from './prizes.controller';
import { Prize } from './entities/prize.entity';
import { Player } from '../players/entities/player.entity';
import { ClaimedPrize } from '../claimed-prizes/entities/claimed-prize.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prize, Player, ClaimedPrize]),
    ScheduleModule.forRoot(),
  ],
  controllers: [PrizesController],
  providers: [PrizesService],
})
export class PrizesModule {}
