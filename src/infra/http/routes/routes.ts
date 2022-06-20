import { Router } from "express";
import tasksRouter from "./tasks";
import sessionRoute from "./sessions";

const routes = Router();

routes.use("/tasks", tasksRouter);
routes.use("/auth", sessionRoute);

export default routes;
