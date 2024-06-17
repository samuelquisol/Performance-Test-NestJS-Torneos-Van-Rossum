import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { PrizesService } from './prizes.service';
import { ClaimedPrize } from '../claimed-prizes/entities/claimed-prize.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBadRequestResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Prize } from './entities/prize.entity';
import { CreatePrizeDto } from './dto/create-prize.dto';

@ApiTags('Prizes')
@Controller('prizes')
export class PrizesController {
  constructor(private readonly prizesService: PrizesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prize' })
  @ApiResponse({ status: 201, description: 'The prize has been successfully created.', type: Prize })
  @ApiBody({ type: CreatePrizeDto })
  async create(@Body() createPrizeDto: CreatePrizeDto): Promise<Prize> {
    return this.prizesService.createPrize(createPrizeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all prizes' })
  @ApiResponse({ status: 200, description: 'Retrieved all prizes successfully.', type: [Prize] })
  @ApiQuery({ name: 'searchTerm', required: false, description: 'Search term for filtering prizes by name' })
  @ApiQuery({ name: 'orderField', required: false, description: 'Field to order by', enum: ['id', 'name', 'description', 'quantity', 'lastClaimedAt'] })
  @ApiQuery({ name: 'orderType', required: false, description: 'Order type (ASC or DESC)', enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of results per page', type: Number })
  async findAll(
    @Query('searchTerm') searchTerm: string,
    @Query('orderField') orderField: string = 'id',
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Prize[]; total: number; page: number; lastPage: number }> {
    return this.prizesService.findAllPrizes(searchTerm, orderField, orderType, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a prize by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the prize to retrieve' })
  @ApiResponse({ status: 200, description: 'Retrieved the prize successfully.', type: Prize })
  async findOne(@Param('id') id: string): Promise<Prize> {
    return this.prizesService.findPrizeById(id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update a prize by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the prize to update' })
  @ApiResponse({ status: 200, description: 'Updated the prize successfully.', type: Prize })
  @ApiBody({ type: Prize })
  async update(@Param('id') id: string, @Body() prize: Prize): Promise<Prize> {
    return this.prizesService.updatePrize(id, prize);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prize by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the prize to delete' })
  @ApiResponse({ status: 204, description: 'Deleted the prize successfully.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.prizesService.deletePrize(id);
  }

  @Post('claim/:playerId')
  @ApiOperation({ summary: 'Claim a prize for a player' })
  @ApiParam({ name: 'playerId', description: 'The ID of the player claiming the prize' })
  @ApiResponse({ status: 201, description: 'The prize has been successfully claimed.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async claimPrize(@Param('playerId') playerId: string): Promise<ClaimedPrize> {
    return this.prizesService.claimPrize(playerId);
  }

  @Get('claimed/:playerId')
  @ApiOperation({ summary: 'Get claimed prizes for a player' })
  @ApiParam({ name: 'playerId', description: 'The ID of the player to retrieve claimed prizes for' })
  @ApiResponse({ status: 200, description: 'Return the claimed prizes for the player.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  async getClaimedPrizes(@Param('playerId') playerId: string): Promise<ClaimedPrize[]> {
    return this.prizesService.getClaimedPrizes(playerId);
  }
}
