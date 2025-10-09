import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { RegisterCheckpointUseCase } from '../../application/use-cases/register-checkpoint.usecase';
import { GetTrackingUseCase } from '../../application/use-cases/get-tracking.usecase';
import { ListShipmentsByStatusUseCase } from '../../application/use-cases/list-shipments-by-status.usecase';
import { CreateCheckpointDto } from '../dtos/create-checkpoint.dto';
import { ShipmentsQueryDto } from '../dtos/shipments-query.dto';
import { ShipmentStatus } from '../../domain/value-objects/status';

@Controller()
export class TrackingController {
  constructor(
    private readonly registerUC: RegisterCheckpointUseCase,
    private readonly trackingUC: GetTrackingUseCase,
    private readonly listUC: ListShipmentsByStatusUseCase,
  ) {
    // Seed a couple of shipments so the API is usable out-of-the-box
    this.registerUC.registerShipment('TST-0001');
    this.registerUC.registerShipment('TST-0002');
  }

  @Post('checkpoints')
  async registerCheckpoint(@Body() dto: CreateCheckpointDto, @Headers('Idempotency-Key') idemKey?: string) {
    return this.registerUC.execute({ ...dto, idemKey });
  }

  @Get('tracking/:trackingId')
  async getTracking(@Param('trackingId') trackingId: string) {
    return this.trackingUC.execute(trackingId);
  }

  @Get('shipments')
  async listShipments(@Query() q: ShipmentsQueryDto) {
    const status = q.status ?? ShipmentStatus.CREATED;
    return this.listUC.execute(status);
  }
}
