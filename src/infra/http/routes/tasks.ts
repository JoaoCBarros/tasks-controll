import { Request, Response, Router } from "express";
import { DateTime } from "ts-luxon";
import { makeTaskController } from "../../../core/factories/Task/TaskControllerFactory";
import TasksExpressAdapter from "../../../core/adpters/express/TasksExpressAdapter";
const tasksExpressAdapter = new TasksExpressAdapter(makeTaskController());
const tasksRouter = Router();

tasksRouter.get("/", tasksExpressAdapter.list());

export default tasksRouter;
