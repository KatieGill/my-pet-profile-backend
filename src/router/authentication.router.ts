import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../../prisma/db.setup";
import bcrypt from "bcrypt";
import {
  createTokenForUser,
  createUnsecuredUserInformation,
} from "../auth-utilities";

export const authController = Router();

authController.post(
  "/auth/login",
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }),
  async ({ body: { username: bodyUsername, password: bodyPassword } }, res) => {
    const user = await prisma.user.findFirst({
      where: {
        username: bodyUsername,
      },
      include: {
        pets: true,
        hospitalNotes: true,
        hospitalFavorites: { include: { hospital: true } },
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordIsCorrect = await bcrypt.compare(
      bodyPassword,
      user.passwordHash
    );
    if (!passwordIsCorrect) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const userInformation = createUnsecuredUserInformation(user);
    const token = createTokenForUser(user);
    return res.status(200).json({ token, userInformation });
  }
);
