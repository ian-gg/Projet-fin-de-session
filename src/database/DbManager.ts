import { EntityTarget, getRepository } from "typeorm";
import Database from "./Database";

export default class DbManager {
  static database: Database | undefined = undefined;

  static async db() {
    if (!DbManager.database) {
      const db = new Database();
      await db.setupConnection();

      DbManager.database = db;
    }

    return DbManager.database;
  }

  static async repo<Entity>(target: EntityTarget<Entity>) {
    // Init db before trying
    await DbManager.db();

    return getRepository(target);
  }
}
