"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCheckpointRepository = void 0;
class InMemoryCheckpointRepository {
    constructor() {
        this.list = [];
        this.idemKeys = new Set();
    }
    async add(checkpoint) {
        this.list.push(checkpoint);
        if (checkpoint.idemKey)
            this.idemKeys.add(checkpoint.idemKey);
    }
    async listByTrackingId(trackingId) {
        return this.list.filter(c => c.trackingId === trackingId).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    }
    async existsIdemKey(idemKey) {
        return this.idemKeys.has(idemKey);
    }
}
exports.InMemoryCheckpointRepository = InMemoryCheckpointRepository;
//# sourceMappingURL=in-memory-checkpoint.repository.js.map