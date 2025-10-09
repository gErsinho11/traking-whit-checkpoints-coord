import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { CheckpointRepository } from '../../domain/repositories/CheckpointRepository';
export declare class GetTrackingUseCase {
    private readonly shipments;
    private readonly checkpoints;
    constructor(shipments: ShipmentRepository, checkpoints: CheckpointRepository);
    execute(trackingId: string): Promise<{
        trackingId: string;
        currentStatus: import("../../domain/value-objects/status").ShipmentStatus;
        history: import("../../domain/entities/Checkpoint").Checkpoint[];
        updatedAt: string;
    }>;
}
