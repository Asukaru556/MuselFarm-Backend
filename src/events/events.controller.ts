import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('events')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles('admin', 'manager', 'operator')
  create(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    return this.eventsService.create(createEventDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'manager', 'operator')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEventDto: UpdateEventDto, @Req() req: any) {
    return this.eventsService.update(id, updateEventDto, req.user.id);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.remove(id);
  }
}
