import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const { name, date } = createTournamentDto;

    const existingTournament = await this.tournamentsRepository.findOne({
      where: { name, date },
    });
    if (existingTournament) {
      throw new ConflictException(
        'Tournament with same name and date already exists',
      );
    }

    const tournament = this.tournamentsRepository.create({
      ...createTournamentDto,
      id: uuidv4(),
    });

    return this.tournamentsRepository.save(tournament);
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

    const [results, total] = await this.tournamentsRepository.findAndCount({
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

  async findOne(id: string): Promise<Tournament> {
    const tournament = await this.tournamentsRepository.findOneBy({ id });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return tournament;
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    await this.tournamentsRepository.update(id, updateTournamentDto);
    const updatedTournament = await this.tournamentsRepository.findOneBy({
      id,
    });
    if (!updatedTournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    return updatedTournament;
  }

  async deactivate(id: string): Promise<void> {
    const tournament = await this.tournamentsRepository.findOneBy({ id });
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
    tournament.isActive = false; // Soft delete
    await this.tournamentsRepository.save(tournament);
  }

  async removePermanently(id: string): Promise<void> {
    const result = await this.tournamentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tournament with ID ${id} not found`);
    }
  }
}
