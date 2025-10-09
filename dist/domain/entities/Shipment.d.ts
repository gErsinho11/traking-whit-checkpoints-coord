import { ShipmentStatus } from '../value-objects/status';
export declare class Shipment {
    readonly trackingId: string;
    status: ShipmentStatus;
    readonly createdAt: string;
    updatedAt: string;
    constructor(trackingId: string, status: ShipmentStatus, createdAt: string, updatedAt: string);
}
