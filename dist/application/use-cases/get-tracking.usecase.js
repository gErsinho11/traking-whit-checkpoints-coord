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
exports.GetTrackingUseCase = void 0;
const common_1 = require("@nestjs/common");
let GetTrackingUseCase = class GetTrackingUseCase {
    constructor(shipments, checkpoints) {
        this.shipments = shipments;
        this.checkpoints = checkpoints;
    }
    async execute(trackingId) {
        const shipment = await this.shipments.getByTrackingId(trackingId);
        if (!shipment)
            throw new common_1.NotFoundException('Shipment not found');
        const history = await this.checkpoints.listByTrackingId(trackingId);
        return {
            trackingId,
            currentStatus: shipment.status,
            history,
            updatedAt: shipment.updatedAt,
        };
    }
};
exports.GetTrackingUseCase = GetTrackingUseCase;
exports.GetTrackingUseCase = GetTrackingUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ShipmentRepository')),
    __param(1, (0, common_1.Inject)('CheckpointRepository')),
    __metadata("design:paramtypes", [Object, Object])
], GetTrackingUseCase);
//# sourceMappingURL=get-tracking.usecase.js.map