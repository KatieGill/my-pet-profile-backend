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
const db_setup_1 = require("./db.setup");
const seedHospitalData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Seeding hospital data");
    const hospital1 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Family Pet Practice",
            phone: "248-681-6200",
            address: "4260 Elizabeth Lake Rd, Waterford Twp, MI 48329",
            image: "/assets/hospital-images/family-pet-practice.jpg",
            website: "https://www.familypetpractice.com",
        },
    });
    const hospital2 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Exclusively Cats Veterinary Hospital",
            phone: "248-666-5287",
            address: "6650 Highland Rd #116, Waterford Twp, MI 43327",
            image: "/assets/hospital-images/e-cats.jpg",
            website: "https://www.ecats.vet",
        },
    });
    const hospital3 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Banfield Pet Hospital",
            phone: "248-674-3101",
            address: "4525 Highland Rd, Waterford Twp, MI 48328",
            image: "/assets/hospital-images/banfield.jpg",
            website: "https://banfield.com",
        },
    });
    const hospital4 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Union Lake Veterinary Hospital",
            phone: "248-363-1508",
            address: "6545 Cooley Lake Rd, Waterford Twp, MI 48327",
            image: "/assets/hospital-images/union-lake.jpg",
            website: "https://unionlakeveterinaryhospital.com",
        },
    });
    const hospital5 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Pet Authority Animal Hospital",
            phone: "248-673-1288",
            address: "4588 W Walton Blvd, Waterford Twp, MI 48329",
            image: "/assets/hospital-images/pet-authority.jpg",
            website: "https://petsloved.com",
        },
    });
    const hospital6 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Oakland Veterinary Referral Services",
            phone: "248-334-6877",
            address: "1400 S Telegraph Rd, Bloomfield Twp, MI 48302",
            image: "/assets/hospital-images/ovrs.jpg",
            website: "https://ovrs.com",
        },
    });
    const hospital7 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Blue Pearl Pet Hospital",
            phone: "248-371-3713",
            address: "3412 Walton Blvd, Auburn Hills, MI 48326",
            image: "/assets/hospital-images/blue-pearl.jpg",
            website: "https://bluepearlvet.com/hospital/auburn-hills-mi/",
        },
    });
    const hospital8 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Veterinary Vision of Rochester",
            phone: "248-402-9844",
            address: "278 E Auburn Rd, Rochester Hills, MI 48307",
            image: "/assets/hospital-images/vet-vision.jpg",
            website: "https://vet-vision.com",
        },
    });
    const hospital9 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Veterinary Cardiology Consultants",
            phone: "248-946-4322",
            address: "24360 Novi Rd Suite B, Novi, MI 48375",
            image: "/assets/hospital-images/cardiology-consultants.png",
            website: "https://vetcardiologyconsultants.com",
        },
    });
    const hospital10 = yield db_setup_1.prisma.hospital.create({
        data: {
            name: "Michigan State University Veterinary Medical Center",
            phone: "517-353-5420",
            address: "736 Wilson Rd, East Lansing, MI 48824",
            image: "/assets/hospital-images/msu.jpg",
            website: "https://cvm.msu.edu/hospital/small-animal",
        },
    });
});
seedHospitalData()
    .then(() => console.log("Seeding hospital data complete"))
    .catch((e) => console.error(e))
    .then(() => db_setup_1.prisma.$disconnect());
//# sourceMappingURL=seed-hospital-data.js.map