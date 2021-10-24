import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm/browser';

import Patient from './Patient';

@Entity()
export default class CentreDeSante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nom: string;

  @OneToMany(() => Patient, patient => patient.centre_de_sante)
  patients: Patient[];
};
