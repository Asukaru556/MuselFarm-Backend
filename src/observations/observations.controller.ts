import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsService } from './observations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('observations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post()
  @Roles('admin', 'biologist')
  create(@Body() createObservationDto: CreateObservationDto, @Req() req: any) {
    return this.observationsService.create(createObservationDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.observationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.observationsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'biologist')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateObservationDto: UpdateObservationDto, @Req() req: any) {
    return this.observationsService.update(id, updateObservationDto, req.user.id);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.observationsService.remove(id);
  }
}
