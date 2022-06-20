import { Request } from "express";
import { AuthRequest } from "../../entities/Session/DTO/SessionDTO";

export interface RequestAuthApplication extends Request {
  auth?: AuthRequest;
}
