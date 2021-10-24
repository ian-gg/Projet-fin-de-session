import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm/browser';

import Intervention from './Intervention';
import Procedure from './Procedure';

@Entity()
export default class InterventionProcedure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Intervention)
  @JoinColumn({ name: 'intervention_id' })
  intervention: Intervention;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id' })
  procedure: Procedure;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  date_debut: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  date_fin: Date;
};
