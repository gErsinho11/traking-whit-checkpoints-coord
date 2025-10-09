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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwt) {
        this.jwt = jwt;
        this.users = [
            { id: '1', username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), roles: ['admin'] },
        ];
    }
    async validateUser(username, pass) {
        const user = this.users.find(u => u.username === username);
        if (!user)
            return null;
        const ok = await bcrypt.compare(pass, user.passwordHash);
        if (!ok)
            return null;
        const { passwordHash, ...rest } = user;
        return rest;
    }
    async login(username, password) {
        const user = await this.validateUser(username, password);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const access_token = await this.jwt.signAsync({ sub: user.id, username: user.username, roles: user.roles });
        return { access_token, token_type: 'Bearer', expires_in: 12 * 60 * 60 };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map