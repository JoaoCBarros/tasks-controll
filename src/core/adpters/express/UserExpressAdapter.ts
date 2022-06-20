import { Request, Response } from "express";
import UserController from "../../controllers/User/UserController";
export default class UserExpressAdapter {
  constructor(private readonly userController: UserController) {}

  create() {
    return async (req: Request, res: Response) => {
      const { email, password, name } = req.body;
      const user = await this.userController.create({
        body: req.body,
      });

      return res.send(user);
    };
  }
}
