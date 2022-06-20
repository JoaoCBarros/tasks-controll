import SessionController from "../../controllers/Session/SessionController";
import { Request, Response } from "express";

export default class SessionExpressAdapter {
  constructor(private readonly sessionController: SessionController) {}

  create() {
    return async (req: Request, res: Response) => {
      const { email, password } = req.body;
      try {
        const session = await this.sessionController.createSession({
          body: {
            email,
            password,
          },
        });

        res.send(session);
      } catch (error) {
        res.status(401).send({
          message: "Error in Authentication",
          errorCode: error.message,
        });
      }
    };
  }
}
