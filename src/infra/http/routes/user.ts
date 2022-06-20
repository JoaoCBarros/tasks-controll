import { Router } from "express";
import { makeUserController } from "../../../core/factories/User/UserControllerFactory";
import UserExpressAdapter from "../../../core/adpters/express/UserExpressAdapter";
import { makeSessionController } from "../../../core/factories/Session/SessionControllerFactory";
import AuthMiddleware from "../middleware/AuthMiddleware";

const userRoute = Router();
const userExpressAdapter = new UserExpressAdapter(makeUserController());
const authMiddleware = new AuthMiddleware(makeSessionController());
userRoute.post("/", authMiddleware.handler(), userExpressAdapter.create());

export default userRoute;
