import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('farms')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @Roles('admin')
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  findAll() {
    return this.farmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.farmsService.remove(id);
  }
}
