import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm/browser';

import Diagnostic from './Diagnostic'
import Fichier from './Fichier';
import Patient from './Patient';

@Entity()
export default class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Diagnostic)
  @JoinColumn({ name: 'diagnostic_id' })
  diagnostic: Diagnostic;

  @Column()
  date_debut: Date;

  @Column()
  date_fin: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  commentaire: string;

  @ManyToMany(() => Fichier)
  @JoinTable({
    name: 'fichier_intervention',
    joinColumn: {
      name: 'intervention_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fichier_id',
      referencedColumnName: 'id',
    }
  })
  fichiers: Fichier[];
};
