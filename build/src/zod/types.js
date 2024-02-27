"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtInfoSchema = exports.authenticatedUserDataSchema = exports.hospitalFavoriteSchema = exports.hospitalNoteSchema = exports.petSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    passwordHash: zod_1.z.string(),
});
exports.petSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    name: zod_1.z.string(),
    species: zod_1.z.string(),
    breed: zod_1.z.string(),
    image: zod_1.z.string(),
    dob: zod_1.z.string(),
});
exports.hospitalNoteSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    hospitalId: zod_1.z.number(),
    note: zod_1.z.string(),
});
exports.hospitalFavoriteSchema = zod_1.z.object({
    id: zod_1.z.number(),
    userId: zod_1.z.number(),
    hospitalId: zod_1.z.number(),
});
exports.authenticatedUserDataSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    passwordHash: zod_1.z.string(),
});
exports.jwtInfoSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    iat: zod_1.z.number(),
});
//# sourceMappingURL=types.js.map