import { NextFunction, Request, Response } from "express";
import SessionController from "../../../core/controllers/Session/SessionController";
import { MiddlewareRequest } from "./DTO/AuthMiddlewareDTO";

export default class AuthMiddleware {
  constructor(private readonly sessionController: SessionController) {}
  handler() {
    return async (
      req: MiddlewareRequest,
      res: Response,
      next: NextFunction
    ) => {
      if (!req.headers || !req.headers.authorization) {
        return res.status(401).json({
          message: "Authentication Credentials not Found",
          error: "NOT_FOUND_TOKEN",
        });
      }
      const [, token] = req.headers.authorization.split(" ");
      if (!token) {
        return res.status(401).json({
          message: "Authentication Credentials not Found",
          error: "NOT_FOUND_TOKEN",
        });
      }
      try {
        const userId = await this.sessionController.verifyAuthSession(token);
        req.auth = {
          userId,
        };
      } catch (error) {
        res.status(401).send({
          message: "Invalid auth token",
          errorCode: error.message,
        });
      }
      next();
    };
  }
}
