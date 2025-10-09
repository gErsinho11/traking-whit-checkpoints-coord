import { ShipmentRepository } from '../../../domain/repositories/ShipmentRepository';
import { Shipment } from '../../../domain/entities/Shipment';
import { ShipmentStatus } from '../../../domain/value-objects/status';
export declare class InMemoryShipmentRepository implements ShipmentRepository {
    private readonly store;
    getByTrackingId(trackingId: string): Promise<Shipment | null>;
    save(shipment: Shipment): Promise<void>;
    listByStatus(status: ShipmentStatus): Promise<Shipment[]>;
}
