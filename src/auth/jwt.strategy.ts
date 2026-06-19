import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-me-in-production',
    });
  }

  async validate(payload: any) {
    const sessionExists = await (this.prisma as any).userSession.findFirst({
      where: { user_id: payload.sub },
    });

    if (!sessionExists) {
      throw new UnauthorizedException('Токен отозван. Пожалуйста, войдите заново.');
    }

    return { id: payload.sub, role: payload.role };
  }
}
