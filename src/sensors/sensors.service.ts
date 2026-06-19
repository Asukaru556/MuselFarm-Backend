import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(private prisma: PrismaService) {}

  async create(createSensorDto: CreateSensorDto) {
    const locationExists = await this.prisma.location.findUnique({
      where: { id: createSensorDto.line_id },
    });
    if (!locationExists) {
      throw new NotFoundException(`Линия/участок с ID ${createSensorDto.line_id} не найдена`);
    }

    const sensorExists = await (this.prisma as any).sensor.findUnique({
      where: { serial_number: createSensorDto.serial_number },
    });
    if (sensorExists) {
      throw new ConflictException(`Датчик с серийным номером ${createSensorDto.serial_number} уже существует`);
    }

    return (this.prisma as any).sensor.create({
      data: createSensorDto,
    });
  }

  async findAll() {
    return (this.prisma as any).sensor.findMany();
  }

  async findOne(id: number) {
    const sensor = await (this.prisma as any).sensor.findUnique({
      where: { id },
    });
    if (!sensor) {
      throw new NotFoundException(`Датчик с ID ${id} не найден`);
    }
    return sensor;
  }

  async update(id: number, updateSensorDto: UpdateSensorDto) {
    await this.findOne(id);

    return (this.prisma as any).sensor.update({
      where: { id },
      data: updateSensorDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return (this.prisma as any).sensor.delete({
      where: { id },
    });
  }
}
