import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Exame } from 'src/exames/exame.entity';
export declare class PacientesService {
    private readonly pacienteRepository;
    constructor(pacienteRepository: Repository<Paciente>);
    findAll(): Promise<Paciente[]>;
    findAllPaginated(page: number, limit: number): Promise<{
        data: Paciente[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    findExames(pacienteId: string): Promise<Exame[]>;
    findOne(id: string): Promise<Paciente>;
    create(dto: CreatePacienteDto): Promise<Paciente>;
    update(id: string, dto: UpdatePacienteDto): Promise<Paciente>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
