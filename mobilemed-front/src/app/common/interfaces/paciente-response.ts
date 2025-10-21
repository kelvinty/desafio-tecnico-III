import { Paciente } from "./paciente";

export interface PacienteResponse {
  data: Paciente[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}