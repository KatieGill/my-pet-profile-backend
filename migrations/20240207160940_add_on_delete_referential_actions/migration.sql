-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "petId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "note" TEXT,
    CONSTRAINT "Medication_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Medication" ("amount", "frequency", "id", "name", "note", "petId") SELECT "amount", "frequency", "id", "name", "note", "petId" FROM "Medication";
DROP TABLE "Medication";
ALTER TABLE "new_Medication" RENAME TO "Medication";
CREATE TABLE "new_Diet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "petId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    CONSTRAINT "Diet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Diet" ("amount", "frequency", "id", "name", "petId") SELECT "amount", "frequency", "id", "name", "petId" FROM "Diet";
DROP TABLE "Diet";
ALTER TABLE "new_Diet" RENAME TO "Diet";
CREATE TABLE "new_HospitalFavorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    CONSTRAINT "HospitalFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HospitalFavorite_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HospitalFavorite" ("hospitalId", "id", "userId") SELECT "hospitalId", "id", "userId" FROM "HospitalFavorite";
DROP TABLE "HospitalFavorite";
ALTER TABLE "new_HospitalFavorite" RENAME TO "HospitalFavorite";
CREATE TABLE "new_HospitalNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "hospitalId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    CONSTRAINT "HospitalNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HospitalNote_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HospitalNote" ("hospitalId", "id", "note", "userId") SELECT "hospitalId", "id", "note", "userId" FROM "HospitalNote";
DROP TABLE "HospitalNote";
ALTER TABLE "new_HospitalNote" RENAME TO "HospitalNote";
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    CONSTRAINT "Pet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("breed", "dob", "id", "image", "name", "species", "userId") SELECT "breed", "dob", "id", "image", "name", "species", "userId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
