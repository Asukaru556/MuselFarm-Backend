import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Injectable()
export class BatchesService {
  private db: any;

  constructor(private prisma: PrismaService) {
    this.db = (this.prisma as any).musselBatch || (this.prisma as any).mussel_batches;
  }

  async create(createBatchDto: CreateBatchDto) {
    const lineExists = await this.prisma.line.findUnique({
      where: { id: createBatchDto.line_id },
    });
    if (!lineExists) {
      throw new NotFoundException(`Линия с ID ${createBatchDto.line_id} не найдена`);
    }

    const batchExists = await this.db.findUnique({
      where: { batch_number: createBatchDto.batch_number },
    });
    if (batchExists) {
      throw new ConflictException(`Партия с номером ${createBatchDto.batch_number} уже существует`);
    }

    return this.db.create({
      data: {
        ...createBatchDto,
        seed_date: new Date(createBatchDto.seed_date),
      },
    });
  }

  async findAll() {
    return this.db.findMany();
  }

  async findOne(id: number) {
    const batch = await this.db.findUnique({
      where: { id },
    });
    if (!batch) {
      throw new NotFoundException(`Партия с ID ${id} не найдена`);
    }
    return batch;
  }

  async update(id: number, updateBatchDto: UpdateBatchDto) {
    await this.findOne(id);

    return this.db.update({
      where: { id },
      data: {
        ...updateBatchDto,
        seed_date: new Date(updateBatchDto.seed_date),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.db.delete({
      where: { id },
    });
  }
}
