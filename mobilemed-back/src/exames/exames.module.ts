import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamesService } from './exames.service';
import { ExameController } from './exame.controller';
import { Exame } from './exame.entity';
import { Paciente } from '../pacientes/paciente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exame, Paciente])],
  controllers: [ExameController],
  providers: [ExamesService],
})
export class ExamesModule {}
