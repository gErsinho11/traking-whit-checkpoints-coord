import { ShipmentStatus } from '../value-objects/status';

export class Shipment {
  constructor(
    public readonly trackingId: string,
    public status: ShipmentStatus,
    public readonly createdAt: string, // ISO
    public updatedAt: string, // ISO
  ) {}
}
