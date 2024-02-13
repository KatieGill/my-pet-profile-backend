import { Router } from "express";
import { prisma } from "../../prisma/db.setup";
import {
  authMiddleware,
  createUnsecuredUserInformation,
  encryptPassword,
} from "../auth-utilities";
import { validateRequest } from "zod-express-middleware";
import { z } from "zod";

export const userController = Router();

//post user
userController.post(
  "/user",
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }),
  async (req, res) => {
    const { username, password } = req.body;
    const usernameAlreadyExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (usernameAlreadyExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const passwordHash = await encryptPassword(password);
    const user = await prisma.user
      .create({
        data: {
          username,
          passwordHash,
        },
      })
      .catch(() => null);
    if (user === null) {
      return res.status(500).json({ message: "Unable to create user" });
    }

    const userInformation = createUnsecuredUserInformation(user);
    return res.status(201).json(userInformation);
  }
);

//get logged-in user data
userController.get("/user/:userId", authMiddleware, async (req, res, next) => {
  const id = +req.params.userId;
  const jwtUser = req.user;
  if (jwtUser) {
    const userData = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (userData === null) {
      return res.status(404).json({ message: "User Data Not Found" });
    }
    const userInformation = createUnsecuredUserInformation(userData);
    res.status(200).json(userInformation);
  }
  next();
});

//edit username
userController.patch(
  "/user/update-username/:userId",
  validateRequest({ body: z.object({ username: z.string() }) }),
  authMiddleware,
  async (req, res) => {
    const jwtUser = req.user;
    if (jwtUser) {
      const id = +req.params.userId;
      const username = req.body.username;
      if (username === jwtUser.username) {
        return res.status(400).json({
          message:
            "Please change your username to something different than your current username",
        });
      }
      const usernameAlreadyExists = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (usernameAlreadyExists) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const updatedUser = await prisma.user
        .update({
          where: {
            id,
          },
          data: {
            username,
          },
        })
        .catch(() => null);
      if (updatedUser === null) {
        return res.status(500).json({ message: "Unable to update user" });
      } else {
        const userInformation = createUnsecuredUserInformation(updatedUser);
        return res.status(200).json(userInformation);
      }
    }
  }
);

//edit password
userController.patch(
  "/user/update-password/:userId",
  validateRequest({ body: z.object({ password: z.string() }) }),
  authMiddleware,
  async (req, res) => {
    const id = +req.params.userId;
    const passwordHash = await encryptPassword(req.body.password);
    const updatedUser = await prisma.user
      .update({
        where: {
          id,
        },
        data: {
          passwordHash,
        },
      })
      .catch(() => null);
    if (updatedUser === null) {
      return res.status(500).json({ message: "Unable to update user" });
    } else {
      const userInformation = createUnsecuredUserInformation(updatedUser);
      return res.status(200).json(userInformation);
    }
  }
);

//delete user profile
userController.delete("/user/:userId", authMiddleware, async (req, res) => {
  const id = +req.params.userId;
  const deletedUser = await prisma.user
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (deletedUser === null) {
    return res.status(500).json({ message: "Unable to delete user profile" });
  }
  return res.status(200).json({ message: "User profile deleted" });
});
