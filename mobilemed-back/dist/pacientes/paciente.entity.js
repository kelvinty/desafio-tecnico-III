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
exports.Paciente = void 0;
const exame_entity_1 = require("../exames/exame.entity");
const typeorm_1 = require("typeorm");
let Paciente = class Paciente {
    id;
    nome;
    sobrenome;
    documento;
    data_nascimento;
    sexo;
    estado_civil;
    nacionalidade;
    telefone;
    email;
    data_cadastro;
    exames;
};
exports.Paciente = Paciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Paciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "sobrenome", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Paciente.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Paciente.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "estado_civil", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "nacionalidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Paciente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Paciente.prototype, "data_cadastro", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exame_entity_1.Exame, (exame) => exame.paciente),
    __metadata("design:type", Array)
], Paciente.prototype, "exames", void 0);
exports.Paciente = Paciente = __decorate([
    (0, typeorm_1.Entity)()
], Paciente);
//# sourceMappingURL=paciente.entity.js.map