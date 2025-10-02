import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { ShipmentStatus } from '../../domain/value-objects/status';

@Injectable()
export class ListShipmentsByStatusUseCase {
  constructor(@Inject('ShipmentRepository') private readonly shipments: ShipmentRepository) {}

  async execute(status: ShipmentStatus) {
    if (!Object.values(ShipmentStatus).includes(status)) throw new BadRequestException('Invalid status');
    return this.shipments.listByStatus(status);
  }
}
