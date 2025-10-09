import { Checkpoint } from '../entities/Checkpoint';
export interface CheckpointRepository {
    add(checkpoint: Checkpoint): Promise<void>;
    listByTrackingId(trackingId: string): Promise<Checkpoint[]>;
    existsIdemKey(idemKey: string): Promise<boolean>;
}
