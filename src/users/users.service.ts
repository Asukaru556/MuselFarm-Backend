import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const candidate = await this.prisma.user.findUnique({ where: { login: dto.login } });
    if (candidate) throw new ConflictException('Логин уже занят');

    const password_hash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: { ...dto, password_hash, password: undefined },
      select: { id: true, login: true, role: true, full_name: true, email: true }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, login: true, role: true, full_name: true, email: true, created_at: true }
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, login: true, role: true, full_name: true, email: true }
    });
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const data: any = { ...dto };
    if (dto.password) {
      data.password_hash = await bcrypt.hash(dto.password, 10);
      delete data.password;
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, login: true, role: true, full_name: true }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Пользователь успешно удален' };
  }
}
