import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export const petSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  species: z.string(),
  breed: z.string(),
  image: z.string(),
  dob: z.string(),
});

export const hospitalNoteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  hospitalId: z.number(),
  note: z.string(),
});

export const hospitalFavoriteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  hospitalId: z.number(),
});

export const authenticatedUserDataSchema = z.object({
  id: z.number(),
  username: z.string(),
  passwordHash: z.string(),
  pets: z.array(petSchema),
  hospitalFavorites: z.array(hospitalFavoriteSchema),
  hospitalNotes: z.array(hospitalNoteSchema),
});

export type AuthenticatedUserData = z.infer<typeof authenticatedUserDataSchema>;
