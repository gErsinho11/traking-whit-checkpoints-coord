import { ShipmentStatus } from '../../domain/value-objects/status';
export declare class CreateCheckpointDto {
    trackingId: string;
    status: ShipmentStatus;
    timestamp?: string;
    location?: string;
}
