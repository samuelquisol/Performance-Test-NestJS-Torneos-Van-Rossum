import { PartialType } from '@nestjs/swagger';
import { CreateClaimedPrizeDto } from './create-claimed-prize.dto';

export class UpdateClaimedPrizeDto extends PartialType(CreateClaimedPrizeDto) {}
