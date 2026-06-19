import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';

@Injectable()
export class MeasurementsService {
  constructor(private prisma: PrismaService) {}

  async create(createMeasurementDto: CreateMeasurementDto) {
    const lineExists = await this.prisma.line.findUnique({
      where: { id: createMeasurementDto.line_id },
    });
    if (!lineExists) {
      throw new NotFoundException(`Линия с ID ${createMeasurementDto.line_id} не найдена`);
    }

    const sensorExists = await (this.prisma as any).sensor.findUnique({
      where: { id: createMeasurementDto.sensor_id },
    });
    if (!sensorExists) {
      throw new NotFoundException(`Датчик с ID ${createMeasurementDto.sensor_id} не найден`);
    }

    return (this.prisma as any).measurement.create({
      data: {
        ...createMeasurementDto,
        measured_at: new Date(createMeasurementDto.measured_at),
      },
    });
  }

  async findAll() {
    return (this.prisma as any).measurement.findMany();
  }

  async findOne(id: number) {
    const measurement = await (this.prisma as any).measurement.findUnique({
      where: { id },
    });
    if (!measurement) {
      throw new NotFoundException(`Запись измерения с ID ${id} не найдена`);
    }
    return measurement;
  }

  async update(id: number, updateMeasurementDto: UpdateMeasurementDto) {
    await this.findOne(id);

    return (this.prisma as any).measurement.update({
      where: { id },
      data: {
        ...updateMeasurementDto,
        measured_at: new Date(updateMeasurementDto.measured_at),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return (this.prisma as any).measurement.delete({
      where: { id },
    });
  }
}
