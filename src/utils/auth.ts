import { Database } from "../lib/database";
import * as bcrypt from "bcryptjs";

class Auth extends Database {
  private readonly SALT_ROUNDS = 12; // Industry standard rounds

  constructor(DB: D1Database) {
    super(DB);
  }

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      return !!user;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw new Error("Failed to check user existence");
    }
  }

  async signUpWithPassword(data: { email: string; password: string }) {
    try {
      return await this.prisma.credentials.create({
        data: {
          email: data.email,
          password: await this.hashPassword(data.password),
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async createUser(data: { email: string; name?: string }) {
    try {
      return await this.prisma.users.create({
        data: {
          email: data.email,
          name: data.name,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export default Auth;
