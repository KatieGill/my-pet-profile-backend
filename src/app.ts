import express from "express";
import cors from "cors";
import { authController } from "./router/authentication.router";
import { userController } from "./router/user.router";
import { hospitalController } from "./router/hospital.router";

const app = express();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

app.use(cors());
app.use(express.json());
app.use(authController);
app.use(userController);
app.use(hospitalController);

app.listen(3000);
