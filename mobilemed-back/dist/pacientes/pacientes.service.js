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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paciente_entity_1 = require("./paciente.entity");
let PacientesService = class PacientesService {
    pacienteRepository;
    constructor(pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }
    async findAll() {
        return this.pacienteRepository.find();
    }
    async findAllPaginated(page, limit) {
        const [data, total] = await this.pacienteRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { nome: 'ASC' },
        });
        return {
            data,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findExames(pacienteId) {
        const paciente = await this.pacienteRepository.findOne({
            where: { id: pacienteId },
            relations: ['exames'],
        });
        if (!paciente) {
            throw new common_1.NotFoundException(`Paciente com id ${pacienteId} não encontrado`);
        }
        return paciente.exames;
    }
    async findOne(id) {
        const paciente = await this.pacienteRepository.findOne({ where: { id } });
        if (!paciente) {
            throw new common_1.NotFoundException(`Paciente com ID ${id} não encontrado`);
        }
        return paciente;
    }
    async create(dto) {
        const novoPaciente = this.pacienteRepository.create(dto);
        return this.pacienteRepository.save(novoPaciente);
    }
    async update(id, dto) {
        const paciente = await this.findOne(id);
        const atualizado = this.pacienteRepository.merge(paciente, dto);
        return this.pacienteRepository.save(atualizado);
    }
    async remove(id) {
        const result = await this.pacienteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Paciente com ID ${id} não encontrado`);
        }
        return { deleted: true };
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PacientesService);
//# sourceMappingURL=pacientes.service.js.map