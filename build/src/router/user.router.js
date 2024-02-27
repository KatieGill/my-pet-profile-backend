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
exports.userController = void 0;
const express_1 = require("express");
const db_setup_1 = require("../../prisma/db.setup");
const auth_utilities_1 = require("../auth-utilities");
const zod_express_middleware_1 = require("zod-express-middleware");
const zod_1 = require("zod");
exports.userController = (0, express_1.Router)();
//post user
exports.userController.post("/user", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const usernameAlreadyExists = yield db_setup_1.prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (usernameAlreadyExists) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const passwordHash = yield (0, auth_utilities_1.encryptPassword)(password);
    const user = yield db_setup_1.prisma.user
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
    const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(user);
    return res.status(201).json(userInformation);
}));
//get logged-in user data
exports.userController.get("/user/:userId", auth_utilities_1.authMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.userId;
    const jwtUser = req.user;
    if (jwtUser) {
        const userData = yield db_setup_1.prisma.user.findFirst({
            where: {
                id,
            },
        });
        if (userData === null) {
            return res.status(404).json({ message: "User Data Not Found" });
        }
        const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(userData);
        res.status(200).json(userInformation);
    }
    next();
}));
//edit username
exports.userController.patch("/user/update-username/:userId", (0, zod_express_middleware_1.validateRequest)({ body: zod_1.z.object({ username: zod_1.z.string() }) }), auth_utilities_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtUser = req.user;
    if (jwtUser) {
        const id = +req.params.userId;
        const username = req.body.username;
        if (username === jwtUser.username) {
            return res.status(400).json({
                message: "Please change your username to something different than your current username",
            });
        }
        const usernameAlreadyExists = yield db_setup_1.prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (usernameAlreadyExists) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const updatedUser = yield db_setup_1.prisma.user
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
        }
        else {
            const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(updatedUser);
            return res.status(200).json(userInformation);
        }
    }
}));
//edit password
exports.userController.patch("/user/update-password/:userId", (0, zod_express_middleware_1.validateRequest)({ body: zod_1.z.object({ password: zod_1.z.string() }) }), auth_utilities_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.userId;
    const passwordHash = yield (0, auth_utilities_1.encryptPassword)(req.body.password);
    const updatedUser = yield db_setup_1.prisma.user
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
    }
    else {
        const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(updatedUser);
        return res.status(200).json(userInformation);
    }
}));
//delete user profile
exports.userController.delete("/user/:userId", auth_utilities_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.userId;
    const deletedUser = yield db_setup_1.prisma.user
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
}));
//get user by username
exports.userController.get("/user/find-user/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const usernameExists = yield db_setup_1.prisma.user
        .findFirst({
        where: {
            username,
        },
    })
        .catch(() => null);
    if (usernameExists === null) {
        return res.status(400).json({ message: "Username does not exist" });
    }
    const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(usernameExists);
    return res.status(200).json(userInformation);
}));
//# sourceMappingURL=user.router.js.map