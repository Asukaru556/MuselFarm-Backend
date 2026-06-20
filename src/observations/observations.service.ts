import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';

@Injectable()
export class ObservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateObservationDto, userId: number) {
    const lineExists = await this.prisma.line.findUnique({ where: { id: dto.line_id } });
    if (!lineExists) throw new NotFoundException(`Линия с ID ${dto.line_id} не найдена`);

    return (this.prisma as any).bioObservation.create({
      data: {
        ...dto,
        created_by: userId,
        observed_at: dto.observed_at ? new Date(dto.observed_at) : new Date(),
      },
    });
  }

  async findAll() {
    return (this.prisma as any).bioObservation.findMany();
  }

  async findOne(id: number) {
    const observation = await (this.prisma as any).bioObservation.findUnique({ where: { id } });
    if (!observation) throw new NotFoundException(`Наблюдение с ID ${id} не найдено`);
    return observation;
  }

  async update(id: number, dto: UpdateObservationDto, userId: number) {
    await this.findOne(id);
    const { line_id, batch_id, observed_at, ...observationData } = dto;

    return (this.prisma as any).bioObservation.update({
      where: { id },
      data: {
        ...observationData,
        created_by: userId,
        observed_at: observed_at ? new Date(observed_at) : undefined,
        line: { connect: { id: line_id } },
        batch: { connect: { id: batch_id } }
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return (this.prisma as any).bioObservation.delete({ where: { id } });
  }
}
