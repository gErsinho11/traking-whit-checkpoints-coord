"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkpoint = void 0;
class Checkpoint {
    constructor(id, trackingId, status, timestamp, location, meta, idemKey) {
        this.id = id;
        this.trackingId = trackingId;
        this.status = status;
        this.timestamp = timestamp;
        this.location = location;
        this.meta = meta;
        this.idemKey = idemKey;
    }
}
exports.Checkpoint = Checkpoint;
//# sourceMappingURL=Checkpoint.js.map