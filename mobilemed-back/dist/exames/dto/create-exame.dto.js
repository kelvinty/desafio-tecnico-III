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
exports.CreateExameDto = void 0;
const class_validator_1 = require("class-validator");
class CreateExameDto {
    tipoExame;
    dataExame;
    resultado;
    pacienteId;
}
exports.CreateExameDto = CreateExameDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O tipo de exame é obrigatório.' }),
    __metadata("design:type", String)
], CreateExameDto.prototype, "tipoExame", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'A data do exame deve estar em formato ISO (YYYY-MM-DD).' }),
    __metadata("design:type", String)
], CreateExameDto.prototype, "dataExame", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateExameDto.prototype, "resultado", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'O pacienteId deve ser um UUID válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'É necessário informar o paciente associado ao exame.' }),
    __metadata("design:type", String)
], CreateExameDto.prototype, "pacienteId", void 0);
//# sourceMappingURL=create-exame.dto.js.map