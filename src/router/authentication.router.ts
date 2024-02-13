import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../../prisma/db.setup";
import bcrypt from "bcrypt";
import {
  createJwtTokenForUser,
  createUnsecuredUserInformation,
} from "../auth-utilities";

export const authController = Router();

//login
authController.post(
  "/auth/login",
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordIsCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }
    const userInformation = createUnsecuredUserInformation(user);
    const token = createJwtTokenForUser(user);

    const options = {
      maxAge: 1000 * 60 * 60 * 24, // expire after 24 hours
      httpOnly: true, // Cookie will not be exposed to client side code
      //sameSite: "none", // If client and server origins are different
      //secure: true, // use with HTTPS only
    };
    res.cookie("token", token, options);
    return res.status(200).json(userInformation);
  }
);
