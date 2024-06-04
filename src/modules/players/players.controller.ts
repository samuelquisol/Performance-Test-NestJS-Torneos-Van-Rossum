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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Player' })
  @ApiResponse({
    status: 201,
    description: 'The Player has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePlayerDto })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Players' })
  @ApiResponse({
    status: 200,
    description: 'Return the search results for Players.',
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
    return this.playersService.findAll(
      searchTerm,
      orderField,
      orderType,
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Player by id' })
  @ApiResponse({ status: 200, description: 'Return a single Player.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Player to retrieve' })
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Player by id' })
  @ApiResponse({
    status: 200,
    description: 'The Player has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiParam({ name: 'id', description: 'The ID of the Player to update' })
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a Player by id' })
  @ApiResponse({
    status: 200,
    description: 'The Player has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Player to deactivate',
  })
  deactivate(@Param('id') id: string) {
    return this.playersService.deactivate(id);
  }

  @Delete('remove-partially/:id')
  @ApiOperation({ summary: 'Delete a Player partially by id' })
  @ApiResponse({
    status: 200,
    description: 'The Player has been successfully deleted partially.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Player to delete partially',
  })
  removePartially(@Param('id') id: string) {
    return this.playersService.removePartially(id);
  }

  @Delete('remove-permanently/:id')
  @ApiOperation({ summary: 'Delete a Player permanently by id' })
  @ApiResponse({
    status: 200,
    description: 'The Player has been successfully deleted permanently.',
  })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Player to delete permanently',
  })
  removePermanently(@Param('id') id: string) {
    return this.playersService.removePermanently(id);
  }
}
