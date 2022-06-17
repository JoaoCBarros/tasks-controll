export default interface TokenProvider {
  generateTransparentToken(userId: string, expiresIn: string): Promise<string>;
  verifyTransparentToken(token: string): Promise<string | boolean>;
}
