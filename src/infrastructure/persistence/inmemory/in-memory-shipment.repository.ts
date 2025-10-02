import { ShipmentRepository } from '../../../domain/repositories/ShipmentRepository';
import { Shipment } from '../../../domain/entities/Shipment';
import { ShipmentStatus } from '../../../domain/value-objects/status';

export class InMemoryShipmentRepository implements ShipmentRepository {
  private readonly store = new Map<string, Shipment>();

  async getByTrackingId(trackingId: string): Promise<Shipment | null> {
    return this.store.get(trackingId) ?? null;
  }

  async save(shipment: Shipment): Promise<void> {
    this.store.set(shipment.trackingId, shipment);
  }

  async listByStatus(status: ShipmentStatus): Promise<Shipment[]> {
    return Array.from(this.store.values()).filter(s => s.status === status);
  }
}
