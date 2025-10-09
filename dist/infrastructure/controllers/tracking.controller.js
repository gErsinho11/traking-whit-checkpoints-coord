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
exports.TrackingController = void 0;
const common_1 = require("@nestjs/common");
const register_checkpoint_usecase_1 = require("../../application/use-cases/register-checkpoint.usecase");
const get_tracking_usecase_1 = require("../../application/use-cases/get-tracking.usecase");
const list_shipments_by_status_usecase_1 = require("../../application/use-cases/list-shipments-by-status.usecase");
const create_checkpoint_dto_1 = require("../dtos/create-checkpoint.dto");
const shipments_query_dto_1 = require("../dtos/shipments-query.dto");
const status_1 = require("../../domain/value-objects/status");
let TrackingController = class TrackingController {
    constructor(registerUC, trackingUC, listUC) {
        this.registerUC = registerUC;
        this.trackingUC = trackingUC;
        this.listUC = listUC;
        this.registerUC.registerShipment('TST-0001');
        this.registerUC.registerShipment('TST-0002');
    }
    async registerCheckpoint(dto, idemKey) {
        return this.registerUC.execute({ ...dto, idemKey });
    }
    async getTracking(trackingId) {
        return this.trackingUC.execute(trackingId);
    }
    async listShipments(q) {
        const status = q.status ?? status_1.ShipmentStatus.CREATED;
        return this.listUC.execute(status);
    }
};
exports.TrackingController = TrackingController;
__decorate([
    (0, common_1.Post)('checkpoints'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Idempotency-Key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_checkpoint_dto_1.CreateCheckpointDto, String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "registerCheckpoint", null);
__decorate([
    (0, common_1.Get)('tracking/:trackingId'),
    __param(0, (0, common_1.Param)('trackingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "getTracking", null);
__decorate([
    (0, common_1.Get)('shipments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shipments_query_dto_1.ShipmentsQueryDto]),
    __metadata("design:returntype", Promise)
], TrackingController.prototype, "listShipments", null);
exports.TrackingController = TrackingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [register_checkpoint_usecase_1.RegisterCheckpointUseCase,
        get_tracking_usecase_1.GetTrackingUseCase,
        list_shipments_by_status_usecase_1.ListShipmentsByStatusUseCase])
], TrackingController);
//# sourceMappingURL=tracking.controller.js.map