import app from "./app";
import Env from "../../core/config/envs";

const port = Env.getEnv("PORT") | 3000;

app.listen(port, () => {
  console.log(`App running in PORT: ${port}`);
});
