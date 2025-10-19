import { Paciente } from "./paciente";

export interface Exame {
  id: string;
  tipoExame: string;
  dataExame: string;
  resultado?: string;
  paciente: Paciente;
}