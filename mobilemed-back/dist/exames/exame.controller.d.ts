import { Repository } from 'typeorm';
import { Exame } from './exame.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { ExamesService } from './exames.service';
import { UpdateExameDto } from './dto/update-exame.dto';
export declare class ExameController {
    private readonly exameService;
    private exameRepository;
    private pacienteRepository;
    constructor(exameService: ExamesService, exameRepository: Repository<Exame>, pacienteRepository: Repository<Paciente>);
    create(dto: CreateExameDto): Promise<Exame>;
    findAll(id?: string, page?: string, limit?: string): Promise<Exame | {
        data: Exame[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    replace(id: string, updateExameDto: UpdateExameDto): Promise<Exame>;
    update(id: string, updateExameDto: UpdateExameDto): Promise<Exame>;
    remove(id: string): Promise<void>;
}
