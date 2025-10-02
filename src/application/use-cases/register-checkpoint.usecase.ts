import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ShipmentRepository } from '../../domain/repositories/ShipmentRepository';
import { CheckpointRepository } from '../../domain/repositories/CheckpointRepository';
import { Shipment } from '../../domain/entities/Shipment';
import { ShipmentStatus } from '../../domain/value-objects/status';
import { Checkpoint } from '../../domain/entities/Checkpoint';

type Input = {
  trackingId: string;
  status: ShipmentStatus;
  timestamp?: string; // ISO; default now
  location?: string;
  meta?: Record<string, any>;
  idemKey?: string; // Idempotency-Key header propagated
};

@Injectable()
export class RegisterCheckpointUseCase {
  constructor(
    @Inject('ShipmentRepository') private readonly shipments: ShipmentRepository,
    @Inject('CheckpointRepository') private readonly checkpoints: CheckpointRepository,
  ) {}

  async execute(input: Input) {
    if (!input.trackingId) throw new BadRequestException('trackingId is required');
    if (!Object.values(ShipmentStatus).includes(input.status)) throw new BadRequestException('Invalid status');

    if (input.idemKey) {
      const exists = await this.checkpoints.existsIdemKey(input.idemKey);
      if (exists) return { ok: true, idempotent: true };
    }

    let shipment = await this.shipments.getByTrackingId(input.trackingId);
    if (!shipment) {
      // Only process checkpoints for registered shipments
      throw new NotFoundException('Shipment not registered');
    }

    // Update shipment current status
    const nowIso = new Date().toISOString();
    shipment.status = input.status;
    shipment.updatedAt = nowIso;
    await this.shipments.save(shipment);

    const cp = new Checkpoint(
      crypto.randomUUID(),
      input.trackingId,
      input.status,
      input.timestamp ?? nowIso,
      input.location,
      input.meta,
      input.idemKey,
    );
    await this.checkpoints.add(cp);

    return { ok: true, checkpointId: cp.id };
  }

  // Helper to pre-register shipments (simulating DB seed)
  async registerShipment(trackingId: string) {
    const exists = await this.shipments.getByTrackingId(trackingId);
    if (exists) return;
    const now = new Date().toISOString();
    const s = new Shipment(trackingId, ShipmentStatus.CREATED, now, now);
    await this.shipments.save(s);
  }
}
