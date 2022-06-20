import { Request, Response, Router } from "express";
import { DateTime } from "ts-luxon";
import { makeSessionController } from "../../../core/factories/Session/SessionControllerFactory";
import SessionExpressAdapter from "../../../core/adpters/express/SessionExpressAdapter";

const sessionRoute = Router();
const sessionExpressAdapter = new SessionExpressAdapter(
  makeSessionController()
);

sessionRoute.post("/", sessionExpressAdapter.create());

export default sessionRoute;
