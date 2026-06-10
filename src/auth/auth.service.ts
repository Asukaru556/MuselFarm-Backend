import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens(user: { id: number; login: string; role: string }) {
    const payload = { sub: user.id, login: user.login, role: user.role };
    
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '1d' });

    return { access_token, refresh_token };
  }

  async login(loginDto: LoginDto, ip?: string, userAgent?: string) {
    const { login, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { login } });
    if (!user) throw new UnauthorizedException('Неверный логин или пароль');

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) throw new UnauthorizedException('Неверный логин или пароль');

    const tokens = await this.generateTokens(user);

    const refreshTokenHash = await bcrypt.hash(tokens.refresh_token, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await this.prisma.userSession.create({
      data: {
        user_id: user.id,
        refresh_token_hash: refreshTokenHash,
        expires_at: expiresAt,
        ip_address: ip,
        user_agent: userAgent,
      },
    });

    return {
      ...tokens,
      user: { id: user.id, login: user.login, role: user.role, full_name: user.full_name },
    };
  }

  async refresh(refreshDto: RefreshDto, ip?: string, userAgent?: string) {
    const { refresh_token } = refreshDto;

    let payload: any;
    try {
      payload = this.jwtService.verify(refresh_token);
    } catch (e) {
      throw new UnauthorizedException('Невалидный или просроченный Refresh токен');
    }

    const sessions = await this.prisma.userSession.findMany({
      where: { user_id: payload.sub },
    });

    let currentSession: any = null;
    for (const session of sessions) {
      const isMatched = await bcrypt.compare(refresh_token, session.refresh_token_hash);
      if (isMatched) {
        currentSession = session;
        break;
      }
    }

    if (!currentSession || currentSession.expires_at < new Date()) {
      if (currentSession) {
        await this.prisma.userSession.delete({ where: { id: currentSession.id } });
      }
      throw new UnauthorizedException('Сессия не найдена или истекла');
    }

    await this.prisma.userSession.delete({ where: { id: currentSession.id } });

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('Пользователь не найден');

    const newTokens = await this.generateTokens(user);
    const newHash = await bcrypt.hash(newTokens.refresh_token, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.prisma.userSession.create({
      data: {
        user_id: user.id,
        refresh_token_hash: newHash,
        expires_at: expiresAt,
        ip_address: ip,
        user_agent: userAgent,
      },
    });

    return newTokens;
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
        role: role || 'biologist' 
      },
    });

    return { id: user.id, login: user.login, role: user.role, full_name: user.full_name };
  }
}
