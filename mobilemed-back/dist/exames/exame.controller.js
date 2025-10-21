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
exports.ExameController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const exame_entity_1 = require("./exame.entity");
const paciente_entity_1 = require("../pacientes/paciente.entity");
const create_exame_dto_1 = require("./dto/create-exame.dto");
const typeorm_2 = require("@nestjs/typeorm");
const exames_service_1 = require("./exames.service");
const update_exame_dto_1 = require("./dto/update-exame.dto");
let ExameController = class ExameController {
    exameService;
    exameRepository;
    pacienteRepository;
    constructor(exameService, exameRepository, pacienteRepository) {
        this.exameService = exameService;
        this.exameRepository = exameRepository;
        this.pacienteRepository = pacienteRepository;
    }
    async create(dto) {
        const paciente = await this.pacienteRepository.findOne({ where: { id: dto.pacienteId } });
        if (!paciente) {
            throw new common_1.BadRequestException('Paciente não encontrado.');
        }
        const exame = this.exameRepository.create({
            tipoExame: dto.tipoExame,
            dataExame: dto.dataExame,
            resultado: dto.resultado,
            paciente: paciente,
        });
        return this.exameRepository.save(exame);
    }
    async findAll(id, page, limit) {
        if (id) {
            const exame = await this.exameService.findOne(id);
            if (!exame) {
                throw new common_1.NotFoundException(`Paciente com id ${id} não encontrado`);
            }
            return exame;
        }
        const pageNumber = page ? parseInt(page) : 1;
        const pageSize = limit ? parseInt(limit) : 10;
        return this.exameService.findAllPaginated(pageNumber, pageSize);
    }
    replace(id, updateExameDto) {
        return this.exameService.update(id, updateExameDto);
    }
    update(id, updateExameDto) {
        return this.exameService.update(id, updateExameDto);
    }
    remove(id) {
        return this.exameService.remove(id);
    }
};
exports.ExameController = ExameController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exame_dto_1.CreateExameDto]),
    __metadata("design:returntype", Promise)
], ExameController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExameController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exame_dto_1.UpdateExameDto]),
    __metadata("design:returntype", Promise)
], ExameController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_exame_dto_1.UpdateExameDto]),
    __metadata("design:returntype", Promise)
], ExameController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExameController.prototype, "remove", null);
exports.ExameController = ExameController = __decorate([
    (0, common_1.Controller)('exames'),
    __param(1, (0, typeorm_2.InjectRepository)(exame_entity_1.Exame)),
    __param(2, (0, typeorm_2.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [exames_service_1.ExamesService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ExameController);
//# sourceMappingURL=exame.controller.js.map