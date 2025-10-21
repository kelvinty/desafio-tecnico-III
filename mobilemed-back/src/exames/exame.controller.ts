import { Body, Controller, Post, BadRequestException, Get, Patch, Delete, Param, NotFoundException, Query, Put } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Exame } from './exame.entity';
import { Paciente } from '../pacientes/paciente.entity';
import { CreateExameDto } from './dto/create-exame.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamesService } from './exames.service';
import { UpdateExameDto } from './dto/update-exame.dto';

@Controller('exames')
export class ExameController {
  constructor(

    private readonly exameService: ExamesService,

    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,
    @InjectRepository(Paciente)
    private pacienteRepository: Repository<Paciente>,
  ) {}

  @Post()
  async create(@Body() dto: CreateExameDto) {
    // Busca o paciente pelo ID
    const paciente = await this.pacienteRepository.findOne({ where: { id: dto.pacienteId } });
    if (!paciente) {
      throw new BadRequestException('Paciente não encontrado.');
    }

    // Cria o exame
    const exame = this.exameRepository.create({
      tipoExame: dto.tipoExame,
      dataExame: dto.dataExame,
      resultado: dto.resultado,
      paciente: paciente, // associa o objeto paciente
    });

    return this.exameRepository.save(exame);
  }

  @Get()
    async findAll(
      @Query('id') id?: string,
      @Query('page') page?: string,
      @Query('limit') limit?: string,
    ) {
      if (id) {
        const exame = await this.exameService.findOne(id);
        if (!exame) {
          throw new NotFoundException(`Paciente com id ${id} não encontrado`);
        }
        return exame;
      }
  
      const pageNumber = page ? parseInt(page) : 1;
      const pageSize = limit ? parseInt(limit) : 10;
  
      return this.exameService.findAllPaginated(pageNumber, pageSize);
    }

  @Put(':id')
  replace(@Param('id') id: string, @Body() updateExameDto: UpdateExameDto): Promise<Exame> {
    return this.exameService.update(id, updateExameDto); // ou criar outro método no service se quiser lógica diferente
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExameDto: UpdateExameDto): Promise<Exame> {
    return this.exameService.update(id, updateExameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.exameService.remove(id);
  }
}
