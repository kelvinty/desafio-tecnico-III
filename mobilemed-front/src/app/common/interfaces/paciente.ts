import { Exame } from "./exame";

export interface Paciente {
    id: string;
    nome: string;
    sobrenome: string;
    documento: string;
    data_nascimento: string; // pode ser string se vier via JSON da API
    sexo: string;
    estado_civil: string;
    nacionalidade: string;
    telefone?: string | null;
    email?: string | null;
    data_cadastro: string;
    exames?: Exame[];
}
