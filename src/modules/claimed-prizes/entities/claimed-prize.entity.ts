import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Player } from 'src/modules/players/entities/player.entity';
import { Prize } from 'src/modules/prizes/entities/prize.entity';

@Entity()
export class ClaimedPrize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerId: string;

  @Column()
  prizeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  claimedAt: Date;

  @ManyToOne(() => Player, player => player.claimedPrizes)
  player: Player;

  @ManyToOne(() => Prize, prize => prize.claimedPrizes)
  prize: Prize;
}
