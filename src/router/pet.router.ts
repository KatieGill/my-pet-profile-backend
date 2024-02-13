import { Router } from "express";
import { prisma } from "../../prisma/db.setup";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

export const petController = Router();

//get pets
petController.get("/pet/:userId", async (req, res) => {
  const userId = +req.params.userId;
  const pets = await prisma.pet
    .findMany({
      where: {
        userId,
      },
    })
    .catch(() => null);
  if (pets === null) {
    return res.status(500).json({ message: "Unable to fetch user pets" });
  }
  return res.status(200).json(pets);
});

//post pet
petController.post(
  "/pet",
  validateRequest({
    body: z.object({
      userId: z.number(),
      name: z.string(),
      species: z.string(),
      breed: z.string(),
      dob: z.string(),
      image: z.string(),
    }),
  }),
  async (req, res) => {
    const pet = await prisma.pet
      .create({
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (pet === null) {
      return res.status(500).json({ message: "Unable to create pet" });
    }
    return res.status(200).json(pet);
  }
);

//edit pet
petController.put(
  "/pet/:petId",
  validateRequest({
    body: z.object({
      userId: z.number(),
      name: z.string(),
      species: z.string(),
      breed: z.string(),
      dob: z.string(),
      image: z.string(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.petId;
    const updatedPet = await prisma.pet
      .update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (updatedPet === null) {
      return res.status(500).json({ error: "Unable to update pet" });
    }
    return res.status(200).json(updatedPet);
  }
);

//delete pet
petController.delete("/pet/:petId", async (req, res) => {
  const id = +req.params.petId;
  const deletedPet = await prisma.pet
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (deletedPet === null) {
    return res.status(500).json({ message: "Unable to delete diet" });
  }
  return res.status(200).json({ message: "Pet deleted" });
});

//get pet diets
petController.get("/diet/:petId", async (req, res) => {
  const petId = +req.params.petId;
  const diets = await prisma.diet
    .findMany({
      where: {
        petId,
      },
    })
    .catch(() => null);
  if (diets === null) {
    return res.status(500).json({ message: "Unable to fetch diets" });
  }
  return res.status(200).json(diets);
});

//create diet
petController.post(
  "/diet",
  validateRequest({
    body: z.object({
      petId: z.number(),
      name: z.string(),
      amount: z.string(),
      frequency: z.string(),
    }),
  }),
  async (req, res) => {
    const diet = await prisma.diet
      .create({
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (diet === null) {
      return res.status(500).json({ message: "Unable to create diet" });
    }
    return res.status(200).json(diet);
  }
);

//edit diet
petController.put(
  "/diet/:dietId",
  validateRequest({
    body: z.object({
      petId: z.number(),
      name: z.string(),
      amount: z.string(),
      frequency: z.string(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.dietId;
    const updatedDiet = await prisma.diet
      .update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (updatedDiet === null) {
      return res.status(500).json({ message: "Unable to update diet" });
    }
    return res.status(200).json(updatedDiet);
  }
);

//delete diet
petController.delete("/diet/:dietId", async (req, res) => {
  const id = +req.params.dietId;
  const deletedDiet = await prisma.diet
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (deletedDiet === null) {
    return res.status(500).json({ message: "Unable to delete diet" });
  }
  return res.status(200).json({ message: "Diet deleted" });
});

//get pet medications
petController.get("/medication/:petId", async (req, res) => {
  const petId = +req.params.petId;
  const medications = await prisma.medication
    .findMany({
      where: {
        petId,
      },
    })
    .catch(() => null);
  if (medications === null) {
    return res.status(500).json({ message: "Unable to fetch medications" });
  }
  return res.status(200).json(medications);
});

//create medication
petController.post(
  "/medication",
  validateRequest({
    body: z.object({
      petId: z.number(),
      name: z.string(),
      amount: z.string(),
      frequency: z.string(),
      note: z.string().optional(),
    }),
  }),
  async (req, res) => {
    const medication = await prisma.medication
      .create({
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (medication === null) {
      return res.status(500).json({ message: "Unable to create medication" });
    }
    return res.status(200).json(medication);
  }
);

//edit medication
petController.put(
  "/medication/:medicationId",
  validateRequest({
    body: z.object({
      petId: z.number(),
      name: z.string(),
      amount: z.string(),
      frequency: z.string(),
      note: z.string().optional(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.medicationId;
    const updatedMedication = await prisma.medication
      .update({
        where: {
          id,
        },
        data: {
          ...req.body,
        },
      })
      .catch(() => null);
    if (updatedMedication === null) {
      return res.status(500).json({ error: "Unable to update medication" });
    }
    return res.status(200).json(updatedMedication);
  }
);

//delete medication
petController.delete("/medication/:medicationId", async (req, res) => {
  const id = +req.params.medicationId;
  const deletedMedication = await prisma.medication
    .delete({
      where: {
        id,
      },
    })
    .catch(() => null);
  if (deletedMedication === null) {
    return res.status(500).json({ error: "Unable to delete medication" });
  }
  return res.status(200).json({ message: "Medication deleted" });
});
