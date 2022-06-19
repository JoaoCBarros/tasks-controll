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
      req.auth = {
        userId: "58e65d85-19db-4fe0-b455-1cfda0198d3e",
      };
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
}
