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
exports.ExamesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exame_entity_1 = require("./exame.entity");
const paciente_entity_1 = require("../pacientes/paciente.entity");
let ExamesService = class ExamesService {
    exameRepo;
    pacienteRepo;
    constructor(exameRepo, pacienteRepo) {
        this.exameRepo = exameRepo;
        this.pacienteRepo = pacienteRepo;
    }
    async create(dto) {
        const paciente = await this.pacienteRepo.findOne({ where: { id: dto.pacienteId } });
        if (!paciente) {
            throw new common_1.BadRequestException('Paciente informado não existe.');
        }
        const exame = this.exameRepo.create({
            tipoExame: dto.tipoExame,
            dataExame: dto.dataExame,
            resultado: dto.resultado,
            paciente,
        });
        return this.exameRepo.save(exame);
    }
    async findAll() {
        return this.exameRepo.find({ relations: ['paciente'] });
    }
    async findAllPaginated(page, limit) {
        const [data, total] = await this.exameRepo.findAndCount({
            relations: ['paciente'],
            skip: (page - 1) * limit,
            take: limit,
            order: { dataExame: 'DESC' },
        });
        return {
            data,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const exame = await this.exameRepo.findOne({
            where: { id },
            relations: ['paciente'],
        });
        if (!exame) {
            throw new common_1.NotFoundException('Exame não encontrado.');
        }
        return exame;
    }
    async update(id, dto) {
        const exame = await this.findOne(id);
        if (dto.pacienteId) {
            const paciente = await this.pacienteRepo.findOne({ where: { id: dto.pacienteId } });
            if (!paciente) {
                throw new common_1.BadRequestException('Paciente informado não existe.');
            }
            exame.paciente = paciente;
        }
        Object.assign(exame, dto);
        return this.exameRepo.save(exame);
    }
    async remove(id) {
        const exame = await this.findOne(id);
        await this.exameRepo.remove(exame);
    }
};
exports.ExamesService = ExamesService;
exports.ExamesService = ExamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exame_entity_1.Exame)),
    __param(1, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ExamesService);
//# sourceMappingURL=exames.service.js.map