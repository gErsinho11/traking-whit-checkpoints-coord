import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { ShipmentStatus } from '../../domain/value-objects/status';
export declare class ListShipmentsByStatusUseCase {
    private readonly shipments;
    constructor(shipments: ShipmentRepository);
    execute(status: ShipmentStatus): Promise<import("../../domain/entities/Shipment").Shipment[]>;
}
