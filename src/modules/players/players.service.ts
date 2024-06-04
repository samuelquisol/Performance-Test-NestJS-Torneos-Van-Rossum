import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Player } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { name, age } = createPlayerDto;

    const existingPlayer = await this.playersRepository.findOne({
      where: { name, age },
    });
    if (existingPlayer) {
      throw new ConflictException(
        'Player with same name and date already exists',
      );
    }

    const player = this.playersRepository.create({
      ...createPlayerDto,
      id: uuidv4(),
    });

    return this.playersRepository.save(player);
  }

  async findAll(
    searchTerm: string,
    orderField: string = 'id',
    orderType: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    limit: number = 10,
  ) {
    let whereClause: any = {};

    if (!searchTerm) {
      searchTerm = 'abcdefghijklmnopqrstuvwxyzñ';
    } else {
      whereClause = { name: ILike(`%${searchTerm}%`) };
    }

    const [results, total] = await this.playersRepository.findAndCount({
      where: whereClause, // Flexible search with ILike
      order: { [orderField]: orderType }, // Sorting
      skip: (page - 1) * limit, // Pagination
      take: limit,
    });

    return {
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playersRepository.findOneBy({ id });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    await this.playersRepository.update(id, updatePlayerDto);
    const updatedPlayer = await this.playersRepository.findOneBy({
      id,
    });
    if (!updatedPlayer) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    return updatedPlayer;
  }

  async deactivate(id: string): Promise<void> {
    const player = await this.playersRepository.findOneBy({ id });
    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
    player.isActive = false;
    await this.playersRepository.save(player);
  }

  async removePartially(id: string): Promise<void> {
    const result = await this.playersRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }

  async removePermanently(id: string): Promise<void> {
    const result = await this.playersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }
  }
}
