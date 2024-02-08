import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../../prisma/db.setup";

export const hospitalController = Router();

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
    return res.status(204).json({ error: "No content" });
  }
  return res.status(200).json({ message: "Favorite deleted" });
});

//get user hospital favorites
hospitalController.get("/hospital-favorite/:userId", async (req, res) => {
  const userId = +req.params.userId;
  const userFavorites = await prisma.hospitalFavorite.findMany({
    where: {
      userId,
    },
    include: {
      hospital: true,
    },
  });
  return res.status(200).json(userFavorites);
});

//create hospital favorite
hospitalController.post(
  "/hospital-favorite",
  validateRequest({
    body: z.object({ userId: z.number(), hospitalId: z.number() }),
  }),
  (req, res) => {
    const { userId, hospitalId } = req.body;
    return prisma.hospitalFavorite
      .create({
        data: {
          userId,
          hospitalId,
        },
      })
      .then((favorite) => res.status(201).json(favorite))
      .catch((e) => {
        console.error(e);
        return res.status(500);
      });
  }
);

//get all hospitals
hospitalController.get("/hospital", async (req, res) => {
  const allHospitals = await prisma.hospital.findMany().catch(() => null);
  if (allHospitals === null) {
    return res.status(204).json({ error: "No content" });
  }
  return res.status(200).json({ allHospitals });
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
  (req, res) => {
    const { userId, hospitalId, note } = req.body;
    return prisma.hospitalNote
      .create({
        data: {
          userId,
          hospitalId,
          note,
        },
      })
      .then((note) => res.status(201).json(note))
      .catch((e) => {
        console.error(e);
        return res.status(500);
      });
  }
);

//get user hospital notes
hospitalController.get("/hospital-note/:userId", (req, res) => {
  const userId = +req.params.userId;
  return prisma.hospitalNote
    .findMany({
      where: {
        userId,
      },
    })
    .then((notes) => res.status(201).json(notes))
    .catch((e) => {
      console.error(e);
      return res.status(500);
    });
});

//update hospital note
hospitalController.patch(
  "/hospital-note/:noteId",
  validateRequest({ body: z.object({ note: z.string() }) }),
  async (req, res) => {
    const id = +req.params.noteId;
    const { note } = req.body;
    const updatedNote = await prisma.hospitalNote
      .update({
        where: {
          id,
        },
        data: {
          note,
        },
      })
      .catch(() => null);
    if (updatedNote === null) {
      return res.status(500).json({ error: "Note not updated" });
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
    return res.status(204).json({ error: "No content" });
  }
  return res.status(201).json({ message: "Note deleted" });
});
