import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { CheckpointRepository } from '../../domain/repositories/CheckpointRepository';
import { ShipmentStatus } from '../../domain/value-objects/status';
type Input = {
    trackingId: string;
    status: ShipmentStatus;
    timestamp?: string;
    location?: string;
    meta?: Record<string, any>;
    idemKey?: string;
};
export declare class RegisterCheckpointUseCase {
    private readonly shipments;
    private readonly checkpoints;
    constructor(shipments: ShipmentRepository, checkpoints: CheckpointRepository);
    execute(input: Input): Promise<{
        ok: boolean;
        idempotent: boolean;
        checkpointId?: undefined;
    } | {
        ok: boolean;
        checkpointId: string;
        idempotent?: undefined;
    }>;
    registerShipment(trackingId: string): Promise<void>;
}
export {};
