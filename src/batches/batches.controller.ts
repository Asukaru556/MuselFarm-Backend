import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('batches')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createBatchDto: CreateBatchDto) {
    return this.batchesService.create(createBatchDto);
  }

  @Get()
  findAll() {
    return this.batchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.batchesService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBatchDto: UpdateBatchDto) {
    return this.batchesService.update(id, updateBatchDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.batchesService.remove(id);
  }
}
