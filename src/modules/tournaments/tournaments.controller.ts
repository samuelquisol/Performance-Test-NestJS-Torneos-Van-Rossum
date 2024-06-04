import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Tournament' })
  @ApiResponse({
    status: 201,
    description: 'The Tournament has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateTournamentDto })
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Tournaments' })
  @ApiResponse({
    status: 200,
    description: 'Return the search results for Tournaments.',
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'The name to search for',
  })
  @ApiQuery({
    name: 'orderField',
    required: false,
    description: 'The field to order by',
  })
  @ApiQuery({
    name: 'orderType',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'The order type (ASC or DESC)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'The page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'The number of results per page',
  })
  findAll(
    @Query('searchTerm') searchTerm: string,
    @Query('orderField') orderField: string = 'id',
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'ASC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.tournamentsService.findAll(
      searchTerm,
      orderField,
      orderType,
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Tournament by id' })
  @ApiResponse({ status: 200, description: 'Return a single Tournament.' })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Tournament to retrieve' })
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Tournament by id' })
  @ApiResponse({
    status: 200,
    description: 'The Tournament has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiParam({ name: 'id', description: 'The ID of the Tournament to update' })
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a Tournament by id' })
  @ApiResponse({
    status: 200,
    description: 'The Tournament has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Tournament to deactivate',
  })
  deactivate(@Param('id') id: string) {
    return this.tournamentsService.deactivate(id);
  }

  @Delete('remove-partially/:id')
  @ApiOperation({ summary: 'Delete a Tournament partially by id' })
  @ApiResponse({
    status: 200,
    description: 'The Tournament has been successfully deleted partially.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Tournament to delete partially',
  })
  removePartially(@Param('id') id: string) {
    return this.tournamentsService.removePartially(id);
  }

  @Delete('permanently/:id')
  @ApiOperation({ summary: 'Delete a Tournament permanently by id' })
  @ApiResponse({
    status: 200,
    description: 'The Tournament has been successfully deleted permanently.',
  })
  @ApiResponse({ status: 404, description: 'Tournament not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Tournament to delete permanently',
  })
  removePermanently(@Param('id') id: string) {
    return this.tournamentsService.removePermanently(id);
  }
}
