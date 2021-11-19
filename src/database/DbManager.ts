import { EntityTarget, getRepository } from "typeorm";
import { getManager } from "typeorm/browser";
import Database from "./Database";

export default class DbManager {
  static database: Database | undefined = undefined;

  static async db() {
    if (!this.database) {
      const db = new Database();
      await db.setupConnection();

      this.database = db;
    }

    return this.database;
  }

  static async repo<Entity>(target: EntityTarget<Entity>) {
    // Init db before trying
    await this.db();

    return getRepository(target);
  }

  static async withLastSeqId<Entity>(target: EntityTarget<Entity>, instance: any): Promise<Entity> {
    await this.db();

    const tableName = getRepository(target).metadata.tableName;

    const res = await getManager()
      .createQueryBuilder()
      .select('seq')
      .from('sqlite_sequence', 'sqlite_sequence')
      .where('name = :table_name', { table_name: tableName })
      .getRawOne();

    if (res && res.hasOwnProperty('seq') && !instance.id) {
      instance.id = res.seq;
    }

    return instance;
  }
}
