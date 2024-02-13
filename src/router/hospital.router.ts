import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../../prisma/db.setup";

export const hospitalController = Router();

//get all hospitals
hospitalController.get("/hospital", async (req, res) => {
  const allHospitals = await prisma.hospital.findMany().catch(() => null);
  if (allHospitals === null) {
    return res.status(500).json({ message: "Unable to fetch all hospitals" });
  }
  return res.status(200).json(allHospitals);
});

//get user hospital favorites
hospitalController.get("/hospital-favorite/:userId", async (req, res) => {
  const userId = +req.params.userId;
  const userFavorites = await prisma.hospitalFavorite
    .findMany({
      where: {
        userId,
      },
      include: {
        hospital: true,
      },
    })
    .catch(() => null);
  if (userFavorites === null) {
    return res
      .status(500)
      .json({ message: "Unable to fetch hospital favorites" });
  }
  return res.status(200).json(userFavorites);
});

//create hospital favorite
hospitalController.post(
  "/hospital-favorite",
  validateRequest({
    body: z.object({ userId: z.number(), hospitalId: z.number() }),
  }),
  async (req, res) => {
    const { userId, hospitalId } = req.body;
    const hospitalFavorite = await prisma.hospitalFavorite
      .create({
        data: {
          userId,
          hospitalId,
        },
      })
      .catch(() => null);
    if (hospitalFavorite === null) {
      return res
        .status(500)
        .json({ message: "Unable to create hospital favorite" });
    }
    return res.status(201).json(hospitalFavorite);
  }
);

//delete hospital favorite
hospitalController.delete("/hospital-favorite/:id", async (req, res) => {
  const id = +req.params.id;
  const favoriteDeleted = await prisma.hospitalFavorite
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (favoriteDeleted === null) {
    return res
      .status(500)
      .json({ message: "Unable to delete hospital favorite" });
  }
  return res.status(200).json({ message: "Hospital favorite deleted" });
});

//get user hospital notes
hospitalController.get("/hospital-note/:userId", async (req, res) => {
  const userId = +req.params.userId;
  const hospitalNotes = await prisma.hospitalNote
    .findMany({
      where: {
        userId,
      },
    })
    .catch(() => null);
  if (hospitalNotes === null) {
    return res.status(500).json({ message: "Unable to fetch hospital notes" });
  }
  return res.status(200).json(hospitalNotes);
});

//create hospital note
hospitalController.post(
  "/hospital-note",
  validateRequest({
    body: z.object({
      userId: z.number(),
      hospitalId: z.number(),
      note: z.string(),
    }),
  }),
  async (req, res) => {
    const hospitalNote = await prisma.hospitalNote
      .create({
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (hospitalNote === null) {
      return res
        .status(500)
        .json({ message: "Unable to create hospital note" });
    }

    return res.status(201).json(hospitalNote);
  }
);

//update hospital note
hospitalController.patch(
  "/hospital-note/:noteId",
  validateRequest({ body: z.object({ note: z.string() }) }),
  async (req, res) => {
    const id = +req.params.noteId;
    const updatedNote = await prisma.hospitalNote
      .update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (updatedNote === null) {
      return res.status(500).json({ message: "Unable to update note" });
    }
    return res.status(201).json(updatedNote);
  }
);

//delete hospital note
hospitalController.delete("/hospital-note/:noteId", async (req, res) => {
  const id = +req.params.noteId;
  const deletedNote = await prisma.hospitalNote
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (deletedNote === null) {
    return res.status(500).json({ message: "Unable to delete hospital note" });
  }
  return res.status(200).json({ message: "Deleted hospital note" });
});
