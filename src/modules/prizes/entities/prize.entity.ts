import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClaimedPrize } from 'src/modules/claimed-prizes/entities/claimed-prize.entity';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  lastClaimedAt: Date;

  @OneToMany(() => ClaimedPrize, (claimedPrize) => claimedPrize.prize)
  claimedPrizes: ClaimedPrize[];
}
