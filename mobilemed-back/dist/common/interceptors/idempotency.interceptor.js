"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotencyInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let IdempotencyInterceptor = class IdempotencyInterceptor {
    cache = new Map();
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const idempotencyKey = request.headers['idempotency-key'];
        const method = request.method.toUpperCase();
        if (method !== 'POST') {
            return next.handle();
        }
        if (!idempotencyKey) {
            throw new common_1.BadRequestException('Cabeçalho Idempotency-Key é obrigatório');
        }
        if (this.cache.has(idempotencyKey)) {
            console.log(`🌀 Requisição repetida: ${idempotencyKey}`);
            return (0, rxjs_1.of)(this.cache.get(idempotencyKey));
        }
        return next.handle().pipe((0, operators_1.tap)((response) => {
            console.log(`💾 Salvando resposta para chave: ${idempotencyKey}`);
            this.cache.set(idempotencyKey, response);
        }));
    }
};
exports.IdempotencyInterceptor = IdempotencyInterceptor;
exports.IdempotencyInterceptor = IdempotencyInterceptor = __decorate([
    (0, common_1.Injectable)()
], IdempotencyInterceptor);
//# sourceMappingURL=idempotency.interceptor.js.map