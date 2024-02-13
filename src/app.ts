import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authController } from "./router/authentication.router";
import { userController } from "./router/user.router";
import { hospitalController } from "./router/hospital.router";
import { petController } from "./router/pet.router";
import { User } from "./zod/types";

const app = express();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
}

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(authController);
app.use(userController);
app.use(hospitalController);
app.use(petController);

app.listen(3000);
