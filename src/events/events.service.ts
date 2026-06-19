import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto, userId: number) {
    const lineExists = await this.prisma.line.findUnique({ where: { id: dto.line_id } });
    if (!lineExists) throw new NotFoundException(`Линия с ID ${dto.line_id} не найдена`);

    return (this.prisma as any).operationalEvent.create({
      data: {
        ...dto,
        created_by: userId,
        event_time: dto.event_time ? new Date(dto.event_time) : new Date(),
      },
    });
  }

  async findAll() {
    return (this.prisma as any).operationalEvent.findMany();
  }

  async findOne(id: number) {
    const event = await (this.prisma as any).operationalEvent.findUnique({ where: { id } });
    if (!event) throw new NotFoundException(`Событие с ID ${id} не найдено`);
    return event;
  }

  async update(id: number, dto: UpdateEventDto, userId: number) {
    await this.findOne(id);
    
    const { line_id, ...eventData } = dto;

    return (this.prisma as any).operationalEvent.update({
      where: { id },
      data: {
        ...eventData,
        event_time: dto.event_time ? new Date(dto.event_time) : undefined,
        line: {
          connect: { id: line_id }
        },
        user: {
          connect: { id: userId }
        }
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return (this.prisma as any).operationalEvent.delete({ where: { id } });
  }
}
