import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
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
}
