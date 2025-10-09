export declare class Checkpoint {
    readonly id: string;
    readonly trackingId: string;
    readonly status: string;
    readonly timestamp: string;
    readonly location?: string;
    readonly meta?: Record<string, any>;
    readonly idemKey?: string;
    constructor(id: string, trackingId: string, status: string, timestamp: string, location?: string, meta?: Record<string, any>, idemKey?: string);
}
