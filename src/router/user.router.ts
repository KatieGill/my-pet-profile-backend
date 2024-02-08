import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../../prisma/db.setup";
import { createUnsecuredUserInformation } from "../auth-utilities";

export const userController = Router();

//get logged-in user data
userController.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  const userData = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      pets: true,
      hospitalNotes: true,
      hospitalFavorites: {
        include: {
          hospital: true,
        },
      },
    },
  });
  if (!userData) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const userInformation = createUnsecuredUserInformation(userData);
  return res.status(200).json({ userInformation });
});
