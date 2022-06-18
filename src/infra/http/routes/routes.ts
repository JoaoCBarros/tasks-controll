import { Router } from "express";
import tasksRouter from "./tasks";

const routes = Router();

routes.use("/tasks", tasksRouter);

export default routes;
