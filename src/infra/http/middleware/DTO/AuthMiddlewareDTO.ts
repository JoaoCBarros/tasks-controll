import { Request } from "express";

export interface MiddlewareRequest extends Request {
  auth: AuthRequest;
}

interface AuthRequest {
  userId: string;
}
