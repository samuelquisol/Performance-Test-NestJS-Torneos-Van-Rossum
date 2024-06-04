import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm';
import { Result } from 'src/modules/results/entities/result.entity';
import { Player } from 'src/modules/players/entities/player.entity';

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
  deletedAt?: Date;

  @OneToMany(() => Result, (result) => result.tournaments)
  @JoinTable()
  results: Result[];

  @OneToMany(() => Player, (player) => player.tournament)
  @JoinTable()
  players: Player[];
}
