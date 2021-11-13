import { Connection, ConnectionManager, ConnectionOptions, getConnectionManager } from 'typeorm';

import {
  CentreDeSante,
  Diagnostic,
  Fichier,
  Intervention,
  InterventionProcedure,
  Patient,
  Procedure,
} from '~models';

const dbOptions: ConnectionOptions = {
  name: 'default',
  type: 'react-native',
  database: 'patients.db',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  dropSchema: true,
  synchronize: true,
  entities: [
    CentreDeSante,
    Diagnostic,
    Fichier,
    Intervention,
    InterventionProcedure,
    Patient,
    Procedure,
  ]
};

export default class Database {
  connectionManager: ConnectionManager;
  defaultConnection: Connection;

  async setupConnection() {
    this.connectionManager = getConnectionManager();

    if (this.connectionManager.has(dbOptions.name as string)) {
      this.defaultConnection = this.connectionManager.get(dbOptions.name);
    } else {
      this.defaultConnection = this.connectionManager.create(dbOptions);
    }

    if (this.defaultConnection) {
      console.log('Database connection created!');

      if (!this.defaultConnection.isConnected) {
        await this.defaultConnection.connect();
        console.log('Database connected!');

        await this.defaultConnection.driver.afterConnect();

        // dev
        await seedDatabase();
        console.log('DEV: Database seeded!');
      }
    }

    console.log('Database setup finished!');
  }
}

import {
  CentreDeSanteService,
  DiagnosticService,
  PatientService,
  ProcedureService,
} from '~services';
async function seedDatabase() {
  const centre_de_sante = await CentreDeSanteService.create({
    nom: 'CHU Sainte-Justine',
  });
  await CentreDeSanteService.save(centre_de_sante);

  let patients = await PatientService.createAll([
    { 
      centre_de_sante,
      num_dossier: '1234567',
      nom: 'Felix Bouchard',
      assurance_maladie: 'BOUF94011419',
      assurance_maladie_exp_m: 1,
      assurance_maladie_exp_a: 2026,
      date_naissance: new Date(1994, 1, 14),
      sexe: 'M',
      cellulaire: '514-123-4567'
    },
    { 
      centre_de_sante,
      num_dossier: '1111111',
      nom: 'Alexia Bouchard',
      assurance_maladie: 'BOUA96061519',
      assurance_maladie_exp_m: 6,
      assurance_maladie_exp_a: 2026,
      date_naissance: new Date(1996, 6, 15),
      sexe: 'F',
      cellulaire: '514-321-4567'
    },
    { 
      centre_de_sante,
      num_dossier: '3445009',
      nom: 'Arius Hounkpatin',
      assurance_maladie: 'HOUA50103016',
      assurance_maladie_exp_m: 10,
      assurance_maladie_exp_a: 2024,
      date_naissance: new Date(1950, 10, 30),
      sexe: 'M',
      cellulaire: '438-212-0988'
    },
    { 
      centre_de_sante,
      num_dossier: '0983456',
      nom: 'Mathieu Rouillard',
      assurance_maladie: 'ROUM66030917',
      assurance_maladie_exp_m: 3,
      assurance_maladie_exp_a: 2025,
      date_naissance: new Date(1966, 3, 9),
      sexe: 'M',
      cellulaire: '514-984-2354'
    },
    { 
      centre_de_sante,
      num_dossier: '9024311',
      nom: 'Lucas Raynaud',
      assurance_maladie: 'RAYL33072119',
      assurance_maladie_exp_m: 7,
      assurance_maladie_exp_a: 2025,
      date_naissance: new Date(1933, 7, 21),
      sexe: 'M',
      cellulaire: '423-789-4466'
    },
    { 
      centre_de_sante,
      num_dossier: '7456213',
      nom: 'Ian Garcia-Guerrero',
      assurance_maladie: 'GARI77100816',
      assurance_maladie_exp_m: 10,
      assurance_maladie_exp_a: 2026,
      date_naissance: new Date(1977, 10, 8),
      sexe: 'M',
      cellulaire: '514-144-3647'
    }
  ]);

  await PatientService.saveAll(patients);

  const diagnostic = await DiagnosticService.create({
    etiquette: 'AC',
    description: 'Arrêt cardiaque',
  });

  await DiagnosticService.save(diagnostic);

  const procedure = await ProcedureService.create({
    code: '001',
    description: 'Procedure 001',
  });

  await ProcedureService.save(procedure);
}
