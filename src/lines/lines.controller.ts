import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('lines')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createLineDto: CreateLineDto) {
    return this.linesService.create(createLineDto);
  }

  @Get()
  findAll() {
    return this.linesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linesService.findOne(+id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateLineDto: UpdateLineDto) {
    return this.linesService.update(+id, updateLineDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.linesService.remove(+id);
  }
}
