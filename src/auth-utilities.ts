import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedUserData } from "./zod/types";

const saltRounds = 11;

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const createUnsecuredUserInformation = (
  user: AuthenticatedUserData
) => ({
  id: user.id,
  username: user.username,
  pets: user.pets,
  hospitalFavorites: user.hospitalFavorites,
  hospitalNotes: user.hospitalNotes,
});

export const createTokenForUser = (user: AuthenticatedUserData) => {
  return jwt.sign(createUnsecuredUserInformation(user), process.env.JWT_SECRET);
};
