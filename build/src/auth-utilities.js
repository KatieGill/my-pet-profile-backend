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
exports.authMiddleware = exports.getDataFromJwtToken = exports.createJwtTokenForUser = exports.createUnsecuredUserInformation = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("./zod/types");
const db_setup_1 = require("../prisma/db.setup");
const saltRounds = 11;
const secret = process.env.JWT_SECRET;
const encryptPassword = (password) => {
    return bcrypt_1.default.hash(password, saltRounds);
};
exports.encryptPassword = encryptPassword;
const createUnsecuredUserInformation = (user) => {
    return {
        id: user.id,
        username: user.username,
    };
};
exports.createUnsecuredUserInformation = createUnsecuredUserInformation;
const createJwtTokenForUser = (user) => {
    return jsonwebtoken_1.default.sign((0, exports.createUnsecuredUserInformation)(user), secret);
};
exports.createJwtTokenForUser = createJwtTokenForUser;
const getDataFromJwtToken = (token) => {
    try {
        return types_1.jwtInfoSchema.parse(jsonwebtoken_1.default.verify(token, secret));
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
exports.getDataFromJwtToken = getDataFromJwtToken;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.userId;
    const token = req.cookies.token;
    const jwtData = (0, exports.getDataFromJwtToken)(token);
    if (jwtData === null) {
        return res.status(401).json({ message: "Invalid token" });
    }
    if (jwtData.id !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userFromJwt = yield db_setup_1.prisma.user.findFirst({
        where: {
            id: jwtData.id,
        },
    });
    if (userFromJwt === null) {
        return res.status(401).json({ message: "User not found" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.user = userFromJwt;
    next();
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-utilities.js.map