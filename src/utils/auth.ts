import { eq } from "drizzle-orm";
import { credentialsTable, usersTable } from "../db/schema";
import { Database } from "../lib/database";
import * as bcrypt from "bcryptjs";

class Auth extends Database {
  private readonly SALT_ROUNDS = 12; // Industry standard rounds

  constructor(DB: D1Database) {
    super(DB);
  }

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const user = await this.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .get();

      return !!user;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Failed to check user existence");
    }
  }

  async signUpWithPassword(data: { email: string; password: string }) {
    try {
      return await this.db.insert(credentialsTable)
        .values({
          email: data.email,
          password: await this.hashPassword(data.password),
        })
        .returning();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async createUser(data: { email: string; name?: string }) {
    try {
      return await this.db.insert(usersTable)
        .values({
          email: data.email,
          name: data.name,
        })
        .returning();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }
}

export default Auth;
