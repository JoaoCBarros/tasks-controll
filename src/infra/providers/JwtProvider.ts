import TransparentTokenProvider from "../../core/providers/TransparentTokenProvider";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DecodedJwtToken } from "./JwtProviderDTO";
import Env from "../../core/config/envs";
export default class JwtProvider implements TransparentTokenProvider {
  async verifyTransparentToken(token: string): Promise<string> {
    try {
      const decodedAuth = jwt.verify(token, process.env.JWT_SECRET);
      if (!(<any>decodedAuth).userId) {
        throw new Error("INVALID_CREDENTIALS");
      }
      return (<any>decodedAuth).userId;
    } catch (error) {
      throw new Error("INVALID_TOKEN");
    }
  }
  async generateTransparentToken(
    userId: string,
    expiresIn: string
  ): Promise<string> {
    const token = jwt.sign({ userId }, Env.getEnv("JWT_SECRET"), {
      expiresIn: expiresIn,
      algorithm: "HS256",
    });
    return token;
  }
}
