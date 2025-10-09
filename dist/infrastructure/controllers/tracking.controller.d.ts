import { RegisterCheckpointUseCase } from '../../application/use-cases/register-checkpoint.usecase';
import { GetTrackingUseCase } from '../../application/use-cases/get-tracking.usecase';
import { ListShipmentsByStatusUseCase } from '../../application/use-cases/list-shipments-by-status.usecase';
import { CreateCheckpointDto } from '../dtos/create-checkpoint.dto';
import { ShipmentsQueryDto } from '../dtos/shipments-query.dto';
import { ShipmentStatus } from '../../domain/value-objects/status';
export declare class TrackingController {
    private readonly registerUC;
    private readonly trackingUC;
    private readonly listUC;
    constructor(registerUC: RegisterCheckpointUseCase, trackingUC: GetTrackingUseCase, listUC: ListShipmentsByStatusUseCase);
    registerCheckpoint(dto: CreateCheckpointDto, idemKey?: string): Promise<{
        ok: boolean;
        idempotent: boolean;
        checkpointId?: undefined;
    } | {
        ok: boolean;
        checkpointId: string;
        idempotent?: undefined;
    }>;
    getTracking(trackingId: string): Promise<{
        trackingId: string;
        currentStatus: ShipmentStatus;
        history: import("../../domain/entities/Checkpoint").Checkpoint[];
        updatedAt: string;
    }>;
    listShipments(q: ShipmentsQueryDto): Promise<import("../../domain/entities/Shipment").Shipment[]>;
}
