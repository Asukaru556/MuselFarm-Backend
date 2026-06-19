import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('measurements')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  @Roles('admin', 'manager', 'operator', 'biologist')
  create(@Body() createMeasurementDto: CreateMeasurementDto) {
    return this.measurementsService.create(createMeasurementDto);
  }

  @Get()
  findAll() {
    return this.measurementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.measurementsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'manager')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMeasurementDto: UpdateMeasurementDto) {
    return this.measurementsService.update(id, updateMeasurementDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.measurementsService.remove(id);
  }
}
