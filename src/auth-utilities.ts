import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { AuthenticatedUserData, jwtInfoSchema } from "./zod/types";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/db.setup";

const saltRounds = 11;
const secret = process.env.JWT_SECRET as Secret;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (user: AuthenticatedUserData) => {
  return {
    id: user.id,
    username: user.username,
  };
};

export const createJwtTokenForUser = (user: AuthenticatedUserData) => {
  return jwt.sign(createUnsecuredUserInformation(user), secret);
};

export const getDataFromJwtToken = (token: string) => {
  try {
    return jwtInfoSchema.parse(jwt.verify(token, secret));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = +req.params.userId;
  const token = req.cookies.token;
  const jwtData = getDataFromJwtToken(token);
  if (jwtData === null) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (jwtData.id !== userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userFromJwt = await prisma.user.findFirst({
    where: {
      id: jwtData.id,
    },
  });
  if (userFromJwt === null) {
    return res.status(401).json({ message: "User not found" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).user = userFromJwt;
  next();
};
