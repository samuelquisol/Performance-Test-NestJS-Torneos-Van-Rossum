import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Repository, ILike } from 'typeorm';
import { Result } from './entities/result.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultsRepository: Repository<Result>,
  ) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const result = this.resultsRepository.create({
      ...createResultDto,
      id: uuidv4(),
    });

    return this.resultsRepository.save(result);
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
      searchTerm =
        'abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYZÑ0123456789';
    } else {
      whereClause = { id: ILike(`%${searchTerm}%`) };
    }

    const [results, total] = await this.resultsRepository.findAndCount({
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

  async findOne(id: string): Promise<Result> {
    const result = await this.resultsRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async update(id: string, updateResultDto: UpdateResultDto): Promise<Result> {
    await this.resultsRepository.update(id, updateResultDto);
    const updatedResult = await this.resultsRepository.findOneBy({
      id,
    });
    if (!updatedResult) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return updatedResult;
  }

  async noAvailable(id: string): Promise<void> {
    const result = await this.resultsRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    result.isAvailable = false;
    await this.resultsRepository.save(result);
  }

  async removePermanently(id: string): Promise<void> {
    const result = await this.resultsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
  }
}
