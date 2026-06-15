import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FarmsModule } from './farms/farms.module';
import { LocationsModule } from './locations/locations.module';
import { LinesModule } from './lines/lines.module';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    UsersModule, FarmsModule, LocationsModule, LinesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
