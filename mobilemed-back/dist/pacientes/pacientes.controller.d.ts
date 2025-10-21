import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
export declare class PacientesController {
    private readonly pacientesService;
    constructor(pacientesService: PacientesService);
    findAll(id?: string, page?: string, limit?: string): Promise<import("./paciente.entity").Paciente | {
        data: import("./paciente.entity").Paciente[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    getExames(id: string): Promise<import("../exames/exame.entity").Exame[]>;
    create(createPacienteDto: CreatePacienteDto): Promise<import("./paciente.entity").Paciente>;
    update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<import("./paciente.entity").Paciente>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
