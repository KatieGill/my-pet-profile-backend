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
exports.hospitalController = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const db_setup_1 = require("../../prisma/db.setup");
exports.hospitalController = (0, express_1.Router)();
//get all hospitals
exports.hospitalController.get("/hospital", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allHospitals = yield db_setup_1.prisma.hospital.findMany().catch(() => null);
    if (allHospitals === null) {
        return res.status(500).json({ message: "Unable to fetch all hospitals" });
    }
    return res.status(200).json(allHospitals);
}));
//get user hospital favorites
exports.hospitalController.get("/hospital-favorite/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.userId;
    const userFavorites = yield db_setup_1.prisma.hospitalFavorite
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
}));
//create hospital favorite
exports.hospitalController.post("/hospital-favorite", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({ userId: zod_1.z.number(), hospitalId: zod_1.z.number() }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, hospitalId } = req.body;
    const hospitalFavorite = yield db_setup_1.prisma.hospitalFavorite
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
}));
//delete hospital favorite
exports.hospitalController.delete("/hospital-favorite/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const favoriteDeleted = yield db_setup_1.prisma.hospitalFavorite
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
}));
//get user hospital notes
exports.hospitalController.get("/hospital-notes/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.userId;
    const hospitalNotes = yield db_setup_1.prisma.hospitalNote
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
}));
//get current hospital note
exports.hospitalController.get("/hospital-note/:hospitalNoteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.hospitalNoteId;
    const hospitalNote = yield db_setup_1.prisma.hospitalNote
        .findFirst({
        where: {
            id,
        },
        include: {
            hospital: {
                select: {
                    name: true,
                },
            },
        },
    })
        .catch(() => null);
    if (hospitalNote === null) {
        return res.status(500).json({ message: "Unable to fetch hospital note" });
    }
    return res.status(200).json(hospitalNote);
}));
//create hospital note
exports.hospitalController.post("/hospital-note", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        userId: zod_1.z.number(),
        hospitalId: zod_1.z.number(),
        note: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitalNote = yield db_setup_1.prisma.hospitalNote
        .create({
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (hospitalNote === null) {
        return res
            .status(500)
            .json({ message: "Unable to create hospital note" });
    }
    return res.status(201).json(hospitalNote);
}));
//update hospital note
exports.hospitalController.patch("/hospital-note/:noteId", (0, zod_express_middleware_1.validateRequest)({ body: zod_1.z.object({ note: zod_1.z.string() }) }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.noteId;
    const updatedNote = yield db_setup_1.prisma.hospitalNote
        .update({
        where: {
            id,
        },
        data: Object.assign({}, req.body),
    })
        .catch(() => null);
    if (updatedNote === null) {
        return res.status(500).json({ message: "Unable to update note" });
    }
    return res.status(201).json(updatedNote);
}));
//delete hospital note
exports.hospitalController.delete("/hospital-note/:noteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.noteId;
    const deletedNote = yield db_setup_1.prisma.hospitalNote
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
}));
//# sourceMappingURL=hospital.router.js.map