import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  async findAll(
    @Query('id') id?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (id) {
      const paciente = await this.pacientesService.findOne(id);
      if (!paciente) {
        throw new NotFoundException(`Paciente com id ${id} não encontrado`);
      }
      return paciente;
    }

    const pageNumber = page ? parseInt(page) : 1;
    const pageSize = limit ? parseInt(limit) : 10;

    return this.pacientesService.findAllPaginated(pageNumber, pageSize);
  }
  
  // pacientes.controller.ts
  @Get(':id/exames')
  async getExames(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    return this.pacientesService.findExames(id);
  }
  // @Get(':id')
  // findOne(@Query('id') id: string) {
  //   return this.pacientesService.findOne(id);
  // }

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.create(createPacienteDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.update(id, updatePacienteDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.pacientesService.remove(id);
  }
}
