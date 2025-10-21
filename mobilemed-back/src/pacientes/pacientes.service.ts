// src/pacientes/pacientes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Exame } from 'src/exames/exame.entity';

@Injectable()
export class PacientesService {
    
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async findAll(): Promise<Paciente[]> {
    return this.pacienteRepository.find();
  }

  async findAllPaginated(page: number, limit: number) {
    const [data, total] = await this.pacienteRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { nome: 'ASC' }, // opcional
    });

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findExames(pacienteId: string): Promise<Exame[]> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['exames'], // importante para trazer os exames
    });

    if (!paciente) {
      throw new NotFoundException(`Paciente com id ${pacienteId} não encontrado`);
    }

    return paciente.exames;
  }

  async findOne(id: string): Promise<Paciente> {
    const paciente = await this.pacienteRepository.findOne({ where: { id } });
    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }
    return paciente;
  }

  async create(dto: CreatePacienteDto): Promise<Paciente> {
    const novoPaciente = this.pacienteRepository.create(dto);
    return this.pacienteRepository.save(novoPaciente);
  }

  async update(id: string, dto: UpdatePacienteDto): Promise<Paciente> {
    const paciente = await this.findOne(id); // valida existência
    const atualizado = this.pacienteRepository.merge(paciente, dto);
    return this.pacienteRepository.save(atualizado);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.pacienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado`);
    }
    return { deleted: true };
  }
}
