import app from "./app";
import Env from "../../core/config/envs";
require("dotenv").config();
const port = Env.getEnv("PORT") | 3000;

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running in PORT: ${process.env.PORT}`);
});
