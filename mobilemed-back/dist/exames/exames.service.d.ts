import { Repository } from 'typeorm';
import { Exame } from './exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { Paciente } from '../pacientes/paciente.entity';
export declare class ExamesService {
    private readonly exameRepo;
    private readonly pacienteRepo;
    constructor(exameRepo: Repository<Exame>, pacienteRepo: Repository<Paciente>);
    create(dto: CreateExameDto): Promise<Exame>;
    findAll(): Promise<Exame[]>;
    findAllPaginated(page: number, limit: number): Promise<{
        data: Exame[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Exame>;
    update(id: string, dto: UpdateExameDto): Promise<Exame>;
    remove(id: string): Promise<void>;
}
