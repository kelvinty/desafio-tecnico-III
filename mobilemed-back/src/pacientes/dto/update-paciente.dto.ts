import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
} from 'class-validator';

export class UpdatePacienteDto {
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
