import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

export class Database {
  protected prisma!: PrismaClient;
  private static instance: Database;

  protected constructor(DB: D1Database) {
    if (!Database.instance) {
      const adapter = new PrismaD1(DB);
      this.prisma = new PrismaClient({ adapter });
      Database.instance = this;
    }
    return Database.instance;
  }
}