import { CheckpointRepository } from '../../../domain/repositories/CheckpointRepository';
import { Checkpoint } from '../../../domain/entities/Checkpoint';
export declare class InMemoryCheckpointRepository implements CheckpointRepository {
    private readonly list;
    private readonly idemKeys;
    add(checkpoint: Checkpoint): Promise<void>;
    listByTrackingId(trackingId: string): Promise<Checkpoint[]>;
    existsIdemKey(idemKey: string): Promise<boolean>;
}
