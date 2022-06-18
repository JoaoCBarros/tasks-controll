require("dotenv").config();

export default class Env {
  static verifyEnvs() {
    if (!process.env.JWT_SECRET || typeof process.env.JWT_SECRET !== "string") {
      throw new Error("NOT FOUND JWT_SECRET ENV");
    }
    if (
      !process.env.SESSION_EXPIRES_NORMAL ||
      typeof process.env.SESSION_EXPIRES_NORMAL !== "string"
    ) {
      throw new Error("NOT FOUND SESSION_EXPIRES_NORMAL ENV");
    }
  }
  static getEnv(envName: string) {
    this.verifyEnvs();
    return process.env[envName];
  }
}
