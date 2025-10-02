import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TrackingController } from './infrastructure/controllers/tracking.controller';
import { HealthController } from './infrastructure/controllers/health.controller';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { InMemoryShipmentRepository } from './infrastructure/persistence/inmemory/in-memory-shipment.repository';
import { InMemoryCheckpointRepository } from './infrastructure/persistence/inmemory/in-memory-checkpoint.repository';
import { RegisterCheckpointUseCase } from './application/use-cases/register-checkpoint.usecase';
import { GetTrackingUseCase } from './application/use-cases/get-tracking.usecase';
import { ListShipmentsByStatusUseCase } from './application/use-cases/list-shipments-by-status.usecase';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [TrackingController, HealthController],
  providers: [
    // Repositories (DI)
    { provide: 'ShipmentRepository', useClass: InMemoryShipmentRepository },
    { provide: 'CheckpointRepository', useClass: InMemoryCheckpointRepository },
    // Use Cases
    RegisterCheckpointUseCase,
    GetTrackingUseCase,
    ListShipmentsByStatusUseCase,
    // Global Guard
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
