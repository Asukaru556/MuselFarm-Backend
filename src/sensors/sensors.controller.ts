import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sensors')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  @Roles('admin', 'manager')
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sensorsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'manager')
  update(@Param('id') id: number, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.sensorsService.remove(id);
  }
}
