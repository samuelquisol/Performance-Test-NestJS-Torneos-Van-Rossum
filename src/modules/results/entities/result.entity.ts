import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';

@Entity()
export class Result {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Tournament, (tournament) => tournament.results)
  tournaments: Tournament[];
}
