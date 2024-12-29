import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";

export class Database {
  private static instance: Database;
  protected db!: DrizzleD1Database;

  protected constructor(DB: D1Database) {
    if (!Database.instance) {
      this.db = drizzle(DB);
      Database.instance = this;
    }
    return Database.instance;
  }
}
