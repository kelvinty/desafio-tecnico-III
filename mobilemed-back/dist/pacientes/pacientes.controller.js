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
exports.PacientesController = void 0;
const common_1 = require("@nestjs/common");
const pacientes_service_1 = require("./pacientes.service");
const create_paciente_dto_1 = require("./dto/create-paciente.dto");
const update_paciente_dto_1 = require("./dto/update-paciente.dto");
let PacientesController = class PacientesController {
    pacientesService;
    constructor(pacientesService) {
        this.pacientesService = pacientesService;
    }
    async findAll(id, page, limit) {
        if (id) {
            const paciente = await this.pacientesService.findOne(id);
            if (!paciente) {
                throw new common_1.NotFoundException(`Paciente com id ${id} não encontrado`);
            }
            return paciente;
        }
        const pageNumber = page ? parseInt(page) : 1;
        const pageSize = limit ? parseInt(limit) : 10;
        return this.pacientesService.findAllPaginated(pageNumber, pageSize);
    }
    async getExames(id) {
        return this.pacientesService.findExames(id);
    }
    create(createPacienteDto) {
        return this.pacientesService.create(createPacienteDto);
    }
    update(id, updatePacienteDto) {
        return this.pacientesService.update(id, updatePacienteDto);
    }
    remove(id) {
        return this.pacientesService.remove(id);
    }
};
exports.PacientesController = PacientesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/exames'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "getExames", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paciente_dto_1.CreatePacienteDto]),
    __metadata("design:returntype", void 0)
], PacientesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paciente_dto_1.UpdatePacienteDto]),
    __metadata("design:returntype", void 0)
], PacientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PacientesController.prototype, "remove", null);
exports.PacientesController = PacientesController = __decorate([
    (0, common_1.Controller)('pacientes'),
    __metadata("design:paramtypes", [pacientes_service_1.PacientesService])
], PacientesController);
//# sourceMappingURL=pacientes.controller.js.map