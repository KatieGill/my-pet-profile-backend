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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const zod_express_middleware_1 = require("zod-express-middleware");
const db_setup_1 = require("../../prisma/db.setup");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_utilities_1 = require("../auth-utilities");
exports.authController = (0, express_1.Router)();
//login
exports.authController.post("/auth/login", (0, zod_express_middleware_1.validateRequest)({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_setup_1.prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "Username not found" });
    }
    const passwordIsCorrect = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!passwordIsCorrect) {
        return res.status(401).json({ message: "Password incorrect" });
    }
    const userInformation = (0, auth_utilities_1.createUnsecuredUserInformation)(user);
    const token = (0, auth_utilities_1.createJwtTokenForUser)(user);
    const options = {
        maxAge: 1000 * 60 * 60 * 24, // expire after 24 hours
        httpOnly: true, // Cookie will not be exposed to client side code
        //sameSite: "none", // If client and server origins are different
        //secure: true, // use with HTTPS only
    };
    res.cookie("token", token, options);
    return res.status(200).json(userInformation);
}));
//# sourceMappingURL=authentication.router.js.map