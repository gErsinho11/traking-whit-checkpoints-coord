import { CheckpointRepository } from '../../../domain/repositories/CheckpointRepository';
import { Checkpoint } from '../../../domain/entities/Checkpoint';

export class InMemoryCheckpointRepository implements CheckpointRepository {
  private readonly list: Checkpoint[] = [];
  private readonly idemKeys = new Set<string>();

  async add(checkpoint: Checkpoint): Promise<void> {
    this.list.push(checkpoint);
    if (checkpoint.idemKey) this.idemKeys.add(checkpoint.idemKey);
  }

  async listByTrackingId(trackingId: string): Promise<Checkpoint[]> {
    return this.list.filter(c => c.trackingId === trackingId).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  async existsIdemKey(idemKey: string): Promise<boolean> {
    return this.idemKeys.has(idemKey);
  }
}
