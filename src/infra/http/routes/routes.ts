import { Router } from "express";
import tasksRouter from "./tasks";
import sessionRoute from "./sessions";
import userRoute from "./user";

const routes = Router();

routes.use("/tasks", tasksRouter);
routes.use("/auth", sessionRoute);
routes.use("/users", userRoute);

export default routes;
