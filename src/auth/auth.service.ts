import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const payload = { 
      sub: user.id, 
      login: user.login, 
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        login: user.login,
        role: user.role,
        full_name: user.full_name,
      },
    };
  }

  async register(registerDto: RegisterDto) {
  const { login, password, full_name, email, role } = registerDto;

  const candidate = await this.prisma.user.findUnique({ where: { login } });
  if (candidate) {
    throw new ConflictException('Пользователь с таким логином уже существует');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await this.prisma.user.create({
    data: {
      login,
      password_hash: passwordHash,
      full_name,
      email,
      role: role || 'biologist',
    },
  });

  return {
    id: user.id,
    login: user.login,
    role: user.role,
    full_name: user.full_name,
    email: user.email,
  };
 }
}
