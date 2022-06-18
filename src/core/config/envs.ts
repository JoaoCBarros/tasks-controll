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
    if (!process.env.DB_USER || typeof process.env.DB_USER !== "string") {
      throw new Error("NOT FOUND DB_USER ENV");
    }
    if (
      !process.env.DB_PASSWORD ||
      typeof process.env.DB_PASSWORD !== "string"
    ) {
      throw new Error("NOT FOUND DB_PASSWORD ENV");
    }
    if (!process.env.DB_NAME || typeof process.env.DB_NAME !== "string") {
      throw new Error("NOT FOUND DB_NAME ENV");
    }
    if (!process.env.DB_HOST || typeof process.env.DB_HOST !== "string") {
      throw new Error("NOT FOUND DB_HOST ENV");
    }
    if (!process.env.DB_PORT || typeof process.env.DB_PORT !== "string") {
      throw new Error("NOT FOUND DB_PORT ENV");
    }
  }
  static getEnv(envName: string) {
    this.verifyEnvs();
    return process.env[envName];
  }
}
