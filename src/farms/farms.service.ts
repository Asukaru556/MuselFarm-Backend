import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmsService {
  constructor(private prisma: PrismaService) {}

  async create(createFarmDto: CreateFarmDto) {
    const exists = await this.prisma.farm.findUnique({ where: { name: createFarmDto.name } });
    if (exists) {
      throw new ConflictException('Ферма с таким названием уже существует');
    }

    return this.prisma.farm.create({
      data: createFarmDto,
      include: { locations: true },
    });
  }

  async findAll() {
    return this.prisma.farm.findMany({
      include: { locations: true },
    });
  }

  async findOne(id: number) {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: { locations: true },
    });
    if (!farm) {
      throw new NotFoundException(`Ферма с ID ${id} не найдена`);
    }
    return farm;
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    await this.findOne(id);

    return this.prisma.farm.update({
      where: { id },
      data: updateFarmDto,
      include: { locations: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.farm.delete({
      where: { id },
    });
  }
}
