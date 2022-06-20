import { Request, Response, Router } from "express";
import { DateTime } from "ts-luxon";
import { makeTaskController } from "../../../core/factories/Task/TaskControllerFactory";
import { makeSessionController } from "../../../core/factories/Session/SessionControllerFactory";
import TasksExpressAdapter from "../../../core/adpters/express/TasksExpressAdapter";
import AuthMiddleware from "../middleware/AuthMiddleware";
const tasksExpressAdapter = new TasksExpressAdapter(makeTaskController());
const tasksRouter = Router();
const authMiddleware = new AuthMiddleware(makeSessionController());
tasksRouter.get("/", authMiddleware.handler(), tasksExpressAdapter.list());
tasksRouter.post(
  "/",
  authMiddleware.handler(),
  tasksExpressAdapter.createTask()
);

export default tasksRouter;
