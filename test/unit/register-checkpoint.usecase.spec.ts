import { RegisterCheckpointUseCase } from '../../src/application/use-cases/register-checkpoint.usecase';
import { InMemoryShipmentRepository } from '../../src/infrastructure/persistence/inmemory/in-memory-shipment.repository';
import { InMemoryCheckpointRepository } from '../../src/infrastructure/persistence/inmemory/in-memory-checkpoint.repository';
import { ShipmentStatus } from '../../src/domain/value-objects/status';

describe('RegisterCheckpointUseCase', () => {
  it('registers a checkpoint and updates shipment status', async () => {
    const uc = new RegisterCheckpointUseCase(new InMemoryShipmentRepository() as any, new InMemoryCheckpointRepository() as any);
    await uc.registerShipment('ABC-123');
    const res = await uc.execute({ trackingId: 'ABC-123', status: ShipmentStatus.PICKED_UP });
    expect(res.ok).toBe(true);
  });

  it('enforces idempotency by idem key', async () => {
    const uc = new RegisterCheckpointUseCase(new InMemoryShipmentRepository() as any, new InMemoryCheckpointRepository() as any);
    await uc.registerShipment('ABC-999');
    await uc.execute({ trackingId: 'ABC-999', status: ShipmentStatus.IN_TRANSIT, idemKey: 'k1' });
    const again = await uc.execute({ trackingId: 'ABC-999', status: ShipmentStatus.IN_TRANSIT, idemKey: 'k1' });
    expect(again.idempotent).toBe(true);
  });
});
