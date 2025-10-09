"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const tracking_controller_1 = require("./infrastructure/controllers/tracking.controller");
const health_controller_1 = require("./infrastructure/controllers/health.controller");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const in_memory_shipment_repository_1 = require("./infrastructure/persistence/inmemory/in-memory-shipment.repository");
const in_memory_checkpoint_repository_1 = require("./infrastructure/persistence/inmemory/in-memory-checkpoint.repository");
const register_checkpoint_usecase_1 = require("./application/use-cases/register-checkpoint.usecase");
const get_tracking_usecase_1 = require("./application/use-cases/get-tracking.usecase");
const list_shipments_by_status_usecase_1 = require("./application/use-cases/list-shipments-by-status.usecase");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET || 'dev-secret',
                signOptions: { expiresIn: '12h' },
            }),
        ],
        controllers: [tracking_controller_1.TrackingController, health_controller_1.HealthController],
        providers: [
            { provide: 'ShipmentRepository', useClass: in_memory_shipment_repository_1.InMemoryShipmentRepository },
            { provide: 'CheckpointRepository', useClass: in_memory_checkpoint_repository_1.InMemoryCheckpointRepository },
            register_checkpoint_usecase_1.RegisterCheckpointUseCase,
            get_tracking_usecase_1.GetTrackingUseCase,
            list_shipments_by_status_usecase_1.ListShipmentsByStatusUseCase,
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map