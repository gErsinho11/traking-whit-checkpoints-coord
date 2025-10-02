import { Shipment } from '../entities/Shipment';
import { ShipmentStatus } from '../value-objects/status';

export interface ShipmentRepository {
  getByTrackingId(trackingId: string): Promise<Shipment | null>;
  save(shipment: Shipment): Promise<void>;
  listByStatus(status: ShipmentStatus): Promise<Shipment[]>;
}
