import { DbManager } from '~db';
import { Patient } from '~models';

export default {


    async get(id: number): Promise<Patient | undefined> {
        return (await DbManager.repo(Patient))
          .findOneOrFail({
            where: { id },
            relations: ['centre_de_sante'],
        });
    },

    async getPatientByName(nom: String): Promise<Patient | undefined> {
        return (await DbManager.repo(Patient))
          .findOneOrFail({
            where: { nom },
            relations: ['centre_de_sante'],
        });
    },

    async create(patient: Object): Promise<Patient> {
        return (await DbManager.repo(Patient)).create(patient);
    },

};
