import TaskController from "../../controllers/Task/TaskController";
import { Request, Response } from "express";
import { AuthRequest } from "../../entities/Session/DTO/SessionDTO";
import { RequestAuthApplication } from "./ExpressRequestDTO";

export default class TasksExpressAdapter {
  constructor(private readonly taskController: TaskController) {}
  list() {
    return async (req: RequestAuthApplication, res: Response) => {
      const tasksList = await this.taskController.tasksList({
        queryStrings: {
          order: "desc",
          orderField: "expiresAt",
        },
        auth: req.auth,
      });
      res.send(tasksList);
    };
  }
  createTask() {
    return async (req: RequestAuthApplication, res: Response) => {
      try {
        const task = await this.taskController.createTask({
          auth: req.auth,
          body: req.body,
        });
        return res.send(task);
      } catch (error) {
        return res.status(400).send({
          message: "There was a problem with you create task",
          errorCode: error.message,
        });
      }
    };
  }
  finishTask() {
    return async (req: RequestAuthApplication, res: Response) => {
      try {
        const task = await this.taskController.finishTask({
          params: {
            taskId: req.params.taskId,
          },
          auth: req.auth,
        });
        res.send(task);
      } catch (error) {
        return res.status(400).send({
          message: "There was a problem with the task completion",
          errorCode: error.message,
        });
      }
    };
  }
}
