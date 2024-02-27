"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petController = void 0;
const express_1 = require("express");
const db_setup_1 = require("../../prisma/db.setup");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
exports.petController = (0, express_1.Router)();
//get pets
exports.petController.get("/pet/user-pets/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.userId;
    const pets = yield db_setup_1.prisma.pet
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
}));
//get current pet info
exports.petController.get("/pet/:petId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.petId;
    const petInfo = yield db_setup_1.prisma.pet
        .findFirst({
        where: { id },
        include: {
            diets: true,
            medications: true,
        },
    })
        .catch(() => null);
    if (petInfo === null) {
        return res.status(500).json({ message: "Unable to get pet information" });
    }
    return res.status(200).json(petInfo);
}));
//post pet
exports.petController.post("/pet", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        userId: zod_1.z.number(),
        name: zod_1.z.string(),
        species: zod_1.z.string(),
        breed: zod_1.z.string(),
        dob: zod_1.z.string(),
        image: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pet = yield db_setup_1.prisma.pet
        .create({
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (pet === null) {
        return res.status(500).json({ message: "Unable to create pet" });
    }
    return res.status(200).json(pet);
}));
//edit pet
exports.petController.put("/pet/:petId", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        userId: zod_1.z.number(),
        name: zod_1.z.string(),
        species: zod_1.z.string(),
        breed: zod_1.z.string(),
        dob: zod_1.z.string(),
        image: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.petId;
    const updatedPet = yield db_setup_1.prisma.pet
        .update({
        where: {
            id,
        },
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (updatedPet === null) {
        return res.status(500).json({ error: "Unable to update pet" });
    }
    return res.status(200).json(updatedPet);
}));
//delete pet
exports.petController.delete("/pet/:petId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.petId;
    const deletedPet = yield db_setup_1.prisma.pet
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
}));
//get pet diets
exports.petController.get("/diets/:petId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = +req.params.petId;
    const diets = yield db_setup_1.prisma.diet
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
}));
//get current diet
exports.petController.get("/diet/:dietId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.dietId;
    const diet = yield db_setup_1.prisma.diet
        .findFirst({
        where: {
            id,
        },
    })
        .catch(() => null);
    if (diet === null) {
        return res.status(500).json({ message: "Unable to fetch diet" });
    }
    return res.status(200).json(diet);
}));
//create diet
exports.petController.post("/diet", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        petId: zod_1.z.number(),
        name: zod_1.z.string(),
        amount: zod_1.z.string(),
        frequency: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const diet = yield db_setup_1.prisma.diet
        .create({
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (diet === null) {
        return res.status(500).json({ message: "Unable to create diet" });
    }
    return res.status(200).json(diet);
}));
//edit diet
exports.petController.put("/diet/:dietId", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        petId: zod_1.z.number(),
        name: zod_1.z.string(),
        amount: zod_1.z.string(),
        frequency: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.dietId;
    const updatedDiet = yield db_setup_1.prisma.diet
        .update({
        where: {
            id,
        },
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (updatedDiet === null) {
        return res.status(500).json({ message: "Unable to update diet" });
    }
    return res.status(200).json(updatedDiet);
}));
//delete diet
exports.petController.delete("/diet/:dietId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.dietId;
    const deletedDiet = yield db_setup_1.prisma.diet
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
}));
//get pet medications
exports.petController.get("/medications/:petId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const petId = +req.params.petId;
    const medications = yield db_setup_1.prisma.medication
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
}));
//get current medication
exports.petController.get("/medication/:medicationId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.medicationId;
    const medication = yield db_setup_1.prisma.medication
        .findFirst({
        where: {
            id,
        },
    })
        .catch(() => null);
    if (medication === null) {
        return res.status(500).json({ message: "Unable to fetch medication" });
    }
    return res.status(200).json(medication);
}));
//create medication
exports.petController.post("/medication", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        petId: zod_1.z.number(),
        name: zod_1.z.string(),
        amount: zod_1.z.string(),
        frequency: zod_1.z.string(),
        note: zod_1.z.string().optional(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medication = yield db_setup_1.prisma.medication
        .create({
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (medication === null) {
        return res.status(500).json({ message: "Unable to create medication" });
    }
    return res.status(200).json(medication);
}));
//edit medication
exports.petController.put("/medication/:medicationId", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        petId: zod_1.z.number(),
        name: zod_1.z.string(),
        amount: zod_1.z.string(),
        frequency: zod_1.z.string(),
        note: zod_1.z.string().optional(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.medicationId;
    const updatedMedication = yield db_setup_1.prisma.medication
        .update({
        where: {
            id,
        },
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (updatedMedication === null) {
        return res.status(500).json({ error: "Unable to update medication" });
    }
    return res.status(200).json(updatedMedication);
}));
//delete medication
exports.petController.delete("/medication/:medicationId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.medicationId;
    const deletedMedication = yield db_setup_1.prisma.medication
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
}));
//# sourceMappingURL=pet.router.js.map