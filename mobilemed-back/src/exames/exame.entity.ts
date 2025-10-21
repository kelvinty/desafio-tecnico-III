import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tipoExame: string;

  @Column({ type: 'date', nullable: true })
  dataExame?: string;

  @Column({ nullable: true })
  resultado?: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.exames, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;
}
