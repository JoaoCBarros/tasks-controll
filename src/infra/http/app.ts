import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";

dotenv.config();

const app: Express = express();

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("EXPRESS WORKING!!!!!");
});

export default app;
