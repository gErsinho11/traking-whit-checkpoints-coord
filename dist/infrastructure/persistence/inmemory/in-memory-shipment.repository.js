"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryShipmentRepository = void 0;
class InMemoryShipmentRepository {
    constructor() {
        this.store = new Map();
    }
    async getByTrackingId(trackingId) {
        return this.store.get(trackingId) ?? null;
    }
    async save(shipment) {
        this.store.set(shipment.trackingId, shipment);
    }
    async listByStatus(status) {
        return Array.from(this.store.values()).filter(s => s.status === status);
    }
}
exports.InMemoryShipmentRepository = InMemoryShipmentRepository;
//# sourceMappingURL=in-memory-shipment.repository.js.map