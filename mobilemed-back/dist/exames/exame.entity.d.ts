import { Paciente } from '../pacientes/paciente.entity';
export declare class Exame {
    id: string;
    tipoExame: string;
    dataExame?: string;
    resultado?: string;
    paciente: Paciente;
}
