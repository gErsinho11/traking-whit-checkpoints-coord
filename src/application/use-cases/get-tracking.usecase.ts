import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { CheckpointRepository } from '../../domain/repositories/CheckpointRepository';

@Injectable()
export class GetTrackingUseCase {
  constructor(
    @Inject('ShipmentRepository') private readonly shipments: ShipmentRepository,
    @Inject('CheckpointRepository') private readonly checkpoints: CheckpointRepository,
  ) {}

  async execute(trackingId: string) {
    const shipment = await this.shipments.getByTrackingId(trackingId);
    if (!shipment) throw new NotFoundException('Shipment not found');
    const history = await this.checkpoints.listByTrackingId(trackingId);
    return {
      trackingId,
      currentStatus: shipment.status,
      history,
      updatedAt: shipment.updatedAt,
    };
  }
}
