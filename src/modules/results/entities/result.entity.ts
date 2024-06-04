import {
  Entity,
  PrimaryColumn,
  Column /* OneToMany, ManyToOne */,
} from 'typeorm';
/* import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Player } from 'src/modules/players/entities/player.entity';
 */
@Entity()
export class Result {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true })
  isAvailable: boolean;

  /*   @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournaments: Tournament[];

  @OneToMany(() => Player, (Player) => Player.results)
  players: Player[];
 */
}
