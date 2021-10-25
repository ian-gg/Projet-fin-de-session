import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm/browser';

import InterventionProcedure from './InterventionProcedure';

@Entity()
export default class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => InterventionProcedure, intervention_procedure => intervention_procedure.procedure)
  intervention_procedures: InterventionProcedure[];
};
