import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { ClaimedPrize } from 'src/modules/claimed-prizes/entities/claimed-prize.entity';

@Entity()
export class Player {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  age: Date;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Tournament, (tournament) => tournament.players)
  tournament: Tournament;

  @OneToMany(() => ClaimedPrize, claimedPrize => claimedPrize.player)
  claimedPrizes: ClaimedPrize[];

}
