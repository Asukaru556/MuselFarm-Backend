import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';

@Injectable()
export class LinesService {
  constructor(private prisma: PrismaService) {}

  async create(createLineDto: CreateLineDto) {
    const locationExists = await this.prisma.location.findUnique({
      where: { id: createLineDto.location_id },
    });
    if (!locationExists) {
      throw new NotFoundException(`Участок с ID ${createLineDto.location_id} не найден`);
    }

    return this.prisma.line.create({
      data: createLineDto,
    });
  }

  async findAll() {
    return this.prisma.line.findMany({
    });
  }

  async findOne(id: number) {
    const line = await this.prisma.line.findUnique({
      where: { id },
    });
    if (!line) {
      throw new NotFoundException(`Линия с ID ${id} не найдена`);
    }
    return line;
  }

  async update(id: number, updateLineDto: UpdateLineDto) {
    await this.findOne(id);

    return this.prisma.line.update({
      where: { id },
      data: updateLineDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.line.delete({
      where: { id },
    });
  }
}
