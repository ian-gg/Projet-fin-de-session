import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm/browser';

import Patient from './Patient';

@Entity()
export default class Fichier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column()
  lien_ressource: string;
};
