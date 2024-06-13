import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Prize } from './entities/prize.entity';
import { Player } from '../players/entities/player.entity';
import { ClaimedPrize } from '../claimed-prizes/entities/claimed-prize.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrizesService {
  constructor(
    @InjectRepository(Prize)
    private prizeRepository: Repository<Prize>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    @InjectRepository(ClaimedPrize)
    private claimedPrizeRepository: Repository<ClaimedPrize>,
  ) {}

  async getRandomPrize(): Promise<Prize> {
    const prizes = await this.prizeRepository.find();
    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    return prize;
  }

  async autoAssignPrize(): Promise<void> {
    const players = await this.playerRepository.find({ where: { isActive: true } });
    for (const player of players) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const claimedPrizesToday = await this.claimedPrizeRepository.find({
        where: { player: { id: player.id }, claimedAt: today },
      });

      if (claimedPrizesToday.length === 0) {
        await this.claimPrize(player.id);
      }
    }
  }

  async claimPrize(playerId: string): Promise<ClaimedPrize> {
    const player = await this.playerRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new NotFoundException('Player not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const claimedPrizesToday = await this.claimedPrizeRepository.find({
      where: { player: { id: playerId }, claimedAt: today },
    });

    if (claimedPrizesToday.length > 0) {
      throw new ConflictException('You have already claimed a prize today');
    }

    const prize = await this.getRandomPrize();
    if (prize.stock <= 0) {
      throw new ConflictException('No prizes available');
    }

    prize.stock -= 1;
    await this.prizeRepository.save(prize);

    const claimedPrize = this.claimedPrizeRepository.create({
      id: uuidv4(),
      player,
      prize,
      claimedAt: new Date(),
    });

    return this.claimedPrizeRepository.save(claimedPrize);
  }

  async getClaimedPrizes(playerId: string): Promise<ClaimedPrize[]> {
    return this.claimedPrizeRepository.find({ where: { player: { id: playerId } } });
  }

    async createPrize(prizeData: Partial<Prize>): Promise<Prize> {
    const prize = this.prizeRepository.create(prizeData);
    return this.prizeRepository.save(prize);
  }

  async findAllPrizes(
    searchTerm: string,
    orderField: string = 'id',
    orderType: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Prize[]; total: number; page: number; lastPage: number }> {
    let whereClause: any = {};

    if (!searchTerm) {
      searchTerm = 'abcdefghijklmnopqrstuvwxyzñ';
    } else {
      whereClause = { name: ILike(`%${searchTerm}%`) };
    }

    const [results, total] = await this.prizeRepository.findAndCount({
      where: whereClause,
      order: { [orderField]: orderType },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findPrizeById(id: string): Promise<Prize> {
    const prize = await this.prizeRepository.findOneBy({ id });
    if (!prize) {
      throw new NotFoundException('Prize not found');
    }
    return prize;
  }

  async updatePrize(prizeId: string, updateData: Partial<Prize>): Promise<Prize> {
    await this.findPrizeById(prizeId);
    await this.prizeRepository.update(prizeId, updateData);
    return this.findPrizeById(prizeId);
  }

  async deletePrize(prizeId: string): Promise<void> {
    await this.findPrizeById(prizeId);
    await this.prizeRepository.delete(prizeId);
  }
}
