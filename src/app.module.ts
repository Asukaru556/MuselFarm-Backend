import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FarmsModule } from './farms/farms.module';
import { LocationsModule } from './locations/locations.module';
import { LinesModule } from './lines/lines.module';
import { BatchesModule } from './batches/batches.module';
import { SensorsModule } from './sensors/sensors.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { ObservationsModule } from './observations/observations.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    UsersModule, FarmsModule, LocationsModule, LinesModule, BatchesModule, SensorsModule, MeasurementsModule, ObservationsModule, EventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
