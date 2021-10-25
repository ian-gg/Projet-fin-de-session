import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm/browser';

import CentreDeSante from './CentreDeSante';
import Fichier from './Fichier';
import Intervention from './Intervention';

@Entity()
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CentreDeSante)
  @JoinColumn({ name: 'centre_de_sante_id' })
  centre_de_sante: CentreDeSante;

  @Column({ length: 7 })
  num_dossier: string;

  @Column({ length: 30 })
  nom: string;

  @Column({ length: 12, unique: true })
  assurance_maladie: string;

  @Column({ type: 'int' })
  assurance_maladie_exp_m: number;

  @Column({ type: 'int' })
  assurance_maladie_exp_a: number;

  @Column({ type: 'date' })
  date_naissance: Date;

  @Column({ type: 'character' })
  sexe: string;

  @Column({ length: 12 })
  cellulaire: string;

  @OneToMany(() => Intervention, intervention => intervention.patient)
  interventions: Intervention[];

  @OneToMany(() => Fichier, fichier => fichier.patient)
  fichiers: Fichier[];
};
