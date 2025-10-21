import { Exame } from 'src/exames/exame.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column({ unique: true })
  documento: string;

  @Column({ type: 'date' })
  data_nascimento: Date;

  @Column()
  sexo: string;

  @Column()
  estado_civil: string;

  @Column()
  nacionalidade: string;

  @Column({ nullable: true })
  telefone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_cadastro: Date;
 
  @OneToMany(() => Exame, (exame) => exame.paciente)
  exames: Exame[];
}