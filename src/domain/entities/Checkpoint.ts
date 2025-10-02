export class Checkpoint {
  constructor(
    public readonly id: string,
    public readonly trackingId: string,
    public readonly status: string,
    public readonly timestamp: string, // ISO
    public readonly location?: string,
    public readonly meta?: Record<string, any>,
    public readonly idemKey?: string,
  ) {}
}
