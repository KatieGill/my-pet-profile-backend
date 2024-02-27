"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authentication_router_1 = require("./router/authentication.router");
const user_router_1 = require("./router/user.router");
const hospital_router_1 = require("./router/hospital.router");
const pet_router_1 = require("./router/pet.router");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(authentication_router_1.authController);
app.use(user_router_1.userController);
app.use(hospital_router_1.hospitalController);
app.use(pet_router_1.petController);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
//# sourceMappingURL=app.js.map