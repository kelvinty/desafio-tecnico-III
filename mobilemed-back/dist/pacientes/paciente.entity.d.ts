import { Exame } from 'src/exames/exame.entity';
export declare class Paciente {
    id: string;
    nome: string;
    sobrenome: string;
    documento: string;
    data_nascimento: Date;
    sexo: string;
    estado_civil: string;
    nacionalidade: string;
    telefone: string;
    email: string;
    data_cadastro: Date;
    exames: Exame[];
}
