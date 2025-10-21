"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exames_service_1 = require("./exames.service");
const exame_controller_1 = require("./exame.controller");
const exame_entity_1 = require("./exame.entity");
const paciente_entity_1 = require("../pacientes/paciente.entity");
let ExamesModule = class ExamesModule {
};
exports.ExamesModule = ExamesModule;
exports.ExamesModule = ExamesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exame_entity_1.Exame, paciente_entity_1.Paciente])],
        controllers: [exame_controller_1.ExameController],
        providers: [exames_service_1.ExamesService],
    })
], ExamesModule);
//# sourceMappingURL=exames.module.js.map