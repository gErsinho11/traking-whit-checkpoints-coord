"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCheckpointUseCase = void 0;
const common_1 = require("@nestjs/common");
const Shipment_1 = require("../../domain/entities/Shipment");
const status_1 = require("../../domain/value-objects/status");
const Checkpoint_1 = require("../../domain/entities/Checkpoint");
let RegisterCheckpointUseCase = class RegisterCheckpointUseCase {
    constructor(shipments, checkpoints) {
        this.shipments = shipments;
        this.checkpoints = checkpoints;
    }
    async execute(input) {
        if (!input.trackingId)
            throw new common_1.BadRequestException('trackingId is required');
        if (!Object.values(status_1.ShipmentStatus).includes(input.status))
            throw new common_1.BadRequestException('Invalid status');
        if (input.idemKey) {
            const exists = await this.checkpoints.existsIdemKey(input.idemKey);
            if (exists)
                return { ok: true, idempotent: true };
        }
        let shipment = await this.shipments.getByTrackingId(input.trackingId);
        if (!shipment) {
            throw new common_1.NotFoundException('Shipment not registered');
        }
        const nowIso = new Date().toISOString();
        shipment.status = input.status;
        shipment.updatedAt = nowIso;
        await this.shipments.save(shipment);
        const cp = new Checkpoint_1.Checkpoint(crypto.randomUUID(), input.trackingId, input.status, input.timestamp ?? nowIso, input.location, input.meta, input.idemKey);
        await this.checkpoints.add(cp);
        return { ok: true, checkpointId: cp.id };
    }
    async registerShipment(trackingId) {
        const exists = await this.shipments.getByTrackingId(trackingId);
        if (exists)
            return;
        const now = new Date().toISOString();
        const s = new Shipment_1.Shipment(trackingId, status_1.ShipmentStatus.CREATED, now, now);
        await this.shipments.save(s);
    }
};
exports.RegisterCheckpointUseCase = RegisterCheckpointUseCase;
exports.RegisterCheckpointUseCase = RegisterCheckpointUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ShipmentRepository')),
    __param(1, (0, common_1.Inject)('CheckpointRepository')),
    __metadata("design:paramtypes", [Object, Object])
], RegisterCheckpointUseCase);
//# sourceMappingURL=register-checkpoint.usecase.js.map