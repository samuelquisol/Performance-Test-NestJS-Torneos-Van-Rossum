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

  /*   @ManytoOne(() => Tournament, (tournament) => tournament.players)
    tournaments: Tournament[];
  
    @ManytoOne(() => Result, (result) => result.players)
    results: Result[];
 */
}
