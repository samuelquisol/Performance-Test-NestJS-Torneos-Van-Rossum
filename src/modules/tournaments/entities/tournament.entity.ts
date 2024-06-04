import {
  Entity,
  PrimaryColumn,
  Column,
  /* OneToMany, */
  DeleteDateColumn,
} from 'typeorm';
/* import { Result } from './result.entity';
import { Player } from './player.entity';
 */
@Entity()
export class Tournament {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  /*   @OneToMany(() => Result, (result) => result.tournament)
  results: Result[];

  @OneToMany(() => Player, (player) => player.tournament)
  players: Player[];
 */
}
