import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm/browser';

import Intervention from './Intervention';

@Entity()
export default class Diagnostic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  etiquette: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Intervention, intervention => intervention.diagnostic)
  interventions: Intervention[];
};
