import { IsNotEmpty, IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateExameDto {
  @IsString()
  @IsNotEmpty({ message: 'O tipo de exame é obrigatório.' })
  tipoExame: string;

  @IsDateString({}, { message: 'A data do exame deve estar em formato ISO (YYYY-MM-DD).' })
  dataExame?: string;

  @IsString()
  resultado?: string;

  @IsUUID('4', { message: 'O pacienteId deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'É necessário informar o paciente associado ao exame.' })
  pacienteId: string;
}
