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
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Result' })
  @ApiResponse({
    status: 201,
    description: 'The Result has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateResultDto })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Results' })
  @ApiResponse({
    status: 200,
    description: 'Return the search results for Results.',
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
    return this.resultsService.findAll(
      searchTerm,
      orderField,
      orderType,
      page,
      limit,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Result by id' })
  @ApiResponse({ status: 200, description: 'Return a single Result.' })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  @ApiParam({ name: 'id', description: 'The ID of the Result to retrieve' })
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Result by id' })
  @ApiResponse({
    status: 200,
    description: 'The Result has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  @ApiBody({ type: UpdateResultDto })
  @ApiParam({ name: 'id', description: 'The ID of the Result to update' })
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultsService.update(id, updateResultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate a Result by id' })
  @ApiResponse({
    status: 200,
    description: 'The Result has been successfully deactivated.',
  })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Result to deactivate',
  })
  deactivate(@Param('id') id: string) {
    return this.resultsService.noAvailable(id);
  }

  @Delete('remove-permanently/:id')
  @ApiOperation({ summary: 'Delete a Result permanently by id' })
  @ApiResponse({
    status: 200,
    description: 'The Result has been successfully deleted permanently.',
  })
  @ApiResponse({ status: 404, description: 'Result not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the Result to delete permanently',
  })
  removePermanently(@Param('id') id: string) {
    return this.resultsService.removePermanently(id);
  }
}
