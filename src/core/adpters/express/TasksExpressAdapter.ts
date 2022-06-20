import TaskController from "../../controllers/Task/TaskController";
import { Request, Response } from "express";
import { AuthRequest } from "../../entities/Session/DTO/SessionDTO";
interface RequestAuthApplication extends Request {
  auth?: AuthRequest;
}
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
      const task = await this.taskController.createTask({
        auth: req.auth,
        body: req.body,
      });
      res.send(task);
    };
  }
}
