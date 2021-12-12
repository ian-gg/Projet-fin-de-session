import {
  Entity,
  Column,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm/browser';

@Entity()
class CentreDeSante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nom: string;

  @OneToMany(type => Patient, patient => patient.centre_de_sante)
  patients: Patient[];
}

@Entity()
class Diagnostic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  etiquette: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(type => Intervention, intervention => intervention.diagnostic)
  interventions: Intervention[];
}

@Entity()
class Fichier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, { nullable: false })
  @JoinColumn({ name: 'id' })
  patient: Patient;

  @Column()
  lien_ressource: string;
}

@Entity()
class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Patient, { nullable: false })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(type => Diagnostic, { nullable: false })
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
  commentaire?: string;

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
    },
  })
  fichiers: Fichier[];
}

@Entity()
class InterventionProcedure {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Intervention, { nullable: false })
  @JoinColumn({ name: 'intervention_id' })
  intervention: Intervention;

  @ManyToOne(type => Procedure, { nullable: false })
  @JoinColumn({ name: 'procedure_id' })
  procedure: Procedure;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  date_debut?: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  date_fin?: Date;
}

@Entity()
class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => CentreDeSante)
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

  @OneToMany(type => Intervention, intervention => intervention.patient)
  interventions: Intervention[];

  @OneToMany(type => Fichier, fichier => fichier.patient)
  fichiers: Fichier[];
}

@Entity()
class Procedure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(
    type => InterventionProcedure,
    intervention_procedure => intervention_procedure.procedure,
  )
  intervention_procedures: InterventionProcedure[];
}

export {
  CentreDeSante,
  Diagnostic,
  Fichier,
  Intervention,
  InterventionProcedure,
  Patient,
  Procedure,
};
