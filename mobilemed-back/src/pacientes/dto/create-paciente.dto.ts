import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsUUID,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nome: string;

  @IsString()
  sobrenome: string;

  @IsString()
  documento: string;

  @IsDateString()
  data_nascimento: Date;

  @IsString()
  sexo: string;

  @IsString()
  estado_civil: string;

  @IsString()
  nacionalidade: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}