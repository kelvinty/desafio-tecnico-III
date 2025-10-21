import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exame } from './exame.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { UpdateExameDto } from './dto/update-exame.dto';
import { Paciente } from '../pacientes/paciente.entity';

@Injectable()
export class ExamesService {
  constructor(
    @InjectRepository(Exame)
    private readonly exameRepo: Repository<Exame>,

    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
  ) {}

  async create(dto: CreateExameDto): Promise<Exame> {
    const paciente = await this.pacienteRepo.findOne({ where: { id: dto.pacienteId } });

    if (!paciente) {
      throw new BadRequestException('Paciente informado não existe.');
    }

    const exame = this.exameRepo.create({
      tipoExame: dto.tipoExame,
      dataExame: dto.dataExame,
      resultado: dto.resultado,
      paciente,
    });

    return this.exameRepo.save(exame);
  }

  async findAll(): Promise<Exame[]> {
    return this.exameRepo.find({ relations: ['paciente'] });
  }

  async findAllPaginated(page: number, limit: number){
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


  async findOne(id: string): Promise<Exame> {
    const exame = await this.exameRepo.findOne({
      where: { id },
      relations: ['paciente'],
    });

    if (!exame) {
      throw new NotFoundException('Exame não encontrado.');
    }

    return exame;
  }

  async update(id: string, dto: UpdateExameDto): Promise<Exame> {
    const exame = await this.findOne(id);

    if (dto.pacienteId) {
      const paciente = await this.pacienteRepo.findOne({ where: { id: dto.pacienteId } });
      if (!paciente) {
        throw new BadRequestException('Paciente informado não existe.');
      }
      exame.paciente = paciente;
    }

    Object.assign(exame, dto);

    return this.exameRepo.save(exame);
  }

  async remove(id: string): Promise<void> {
    const exame = await this.findOne(id);
    await this.exameRepo.remove(exame);
  }
}
