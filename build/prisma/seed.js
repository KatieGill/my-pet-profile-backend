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
exports.seedDatabase = void 0;
const auth_utilities_1 = require("../src/auth-utilities");
const db_setup_1 = require("./db.setup");
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_setup_1.prisma.user.deleteMany();
    yield db_setup_1.prisma.hospital.deleteMany();
});
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Seeding the database...");
    yield clearDatabase();
    const user1 = yield db_setup_1.prisma.user.create({
        data: {
            username: "Katie",
            passwordHash: yield (0, auth_utilities_1.encryptPassword)("password"),
        },
    });
    const user2 = yield db_setup_1.prisma.user.create({
        data: {
            username: "Jess",
            passwordHash: yield (0, auth_utilities_1.encryptPassword)("Strawberry"),
        },
    });
    const user3 = yield db_setup_1.prisma.user.create({
        data: {
            username: "Lindsay",
            passwordHash: yield (0, auth_utilities_1.encryptPassword)("Blueberry"),
        },
    });
    const pet1 = yield db_setup_1.prisma.pet.create({
        data: {
            userId: user1.id,
            name: "Indy",
            species: "cat",
            breed: "Domestic Shorthair",
            image: "/assets/cat-images/brown-cat.png",
            dob: "2024-01-23T05:00:00.000Z",
        },
    });
    const pet2 = yield db_setup_1.prisma.pet.create({
        data: {
            userId: user1.id,
            name: "Teddy",
            species: "cat",
            breed: "Domestic Longhair",
            image: "/assets/cat-images/gray-cat.png",
            dob: "2012-01-24T05:00:00.000Z",
        },
    });
    const pet3 = yield db_setup_1.prisma.pet.create({
        data: {
            userId: user2.id,
            name: "Taco",
            species: "dog",
            breed: "Siberian Husky",
            image: "/assets/dog-images/white-dog.png",
            dob: "2020-07-23T05:00:00.000Z",
        },
    });
    const pet4 = yield db_setup_1.prisma.pet.create({
        data: {
            userId: user2.id,
            name: "Biscuit",
            species: "dog",
            breed: "Australian Shepherd",
            image: "/assets/dog-images/blonde-dog.png",
            dob: "2022-01-23T05:00:00.000Z",
        },
    });
    const pet5 = yield db_setup_1.prisma.pet.create({
        data: {
            userId: user3.id,
            name: "Dutton",
            species: "dog",
            breed: "Mixed / Other",
            image: "/assets/dog-images/black-dog.png",
            dob: "2022-07-23T05:00:00.000Z",
        },
    });
    const diet1 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet1.id,
            name: "Purina Proplan",
            amount: "1/4 can",
            frequency: "twice daily",
        },
    });
    const diet2 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet1.id,
            name: "Purina Proplan",
            amount: "1/4 cup",
            frequency: "twice daily",
        },
    });
    const diet3 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet2.id,
            name: "Purina Proplan",
            amount: "1/4 can",
            frequency: "twice daily",
        },
    });
    const diet4 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet2.id,
            name: "Purina Proplan",
            amount: "1/4 cup",
            frequency: "twice daily",
        },
    });
    const diet5 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet3.id,
            name: "Eukanuba large breed",
            amount: "3/4 cup",
            frequency: "twice daily",
        },
    });
    const diet6 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet4.id,
            name: "Eukanuba large breed",
            amount: "1/2 cup",
            frequency: "twice daily",
        },
    });
    const diet7 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet5.id,
            name: "Purina dog chow",
            amount: "3/4 cup",
            frequency: "twice daily",
        },
    });
    const diet8 = yield db_setup_1.prisma.diet.create({
        data: {
            petId: pet5.id,
            name: "Purina dog chow canned",
            amount: "1/4 can",
            frequency: "once daily",
        },
    });
    const medication1 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet1.id,
            name: "Paroxetine 10mg",
            amount: "1/2 tablet",
            frequency: "once daily",
            note: "for anxiety",
        },
    });
    const medication2 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet1.id,
            name: "Glucosamine",
            amount: "500mg",
            frequency: "once daily",
            note: "for joints",
        },
    });
    const medication3 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet2.id,
            name: "Revolution plus",
            amount: "11.1-22lbs",
            frequency: "once monthly",
            note: "fleas, ticks, heartworm prevention",
        },
    });
    const medication4 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet3.id,
            name: "Benadryl 25mg",
            amount: "2 tablets",
            frequency: "every 12 hours",
            note: "allergies",
        },
    });
    const medication5 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet3.id,
            name: "Simparica Trio",
            amount: "44-88lbs",
            frequency: "once monthly",
            note: "heartworm, flea, tick prevention",
        },
    });
    const medication6 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet4.id,
            name: "Simparica Trio",
            amount: "44-88lbs",
            frequency: "once monthly",
            note: "heartworm, flea, tick prevention",
        },
    });
    const medication7 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet5.id,
            name: "Heartgard Plus",
            amount: "1 chew",
            frequency: "once monthly",
            note: "heartworm prevention",
        },
    });
    const medication8 = yield db_setup_1.prisma.medication.create({
        data: {
            petId: pet5.id,
            name: "K9 Advantix II",
            amount: ">55 lbs",
            frequency: "once monthly",
            note: "flea/tick prevention",
        },
    });
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
    const hospitalNote1 = yield db_setup_1.prisma.hospitalNote.create({
        data: {
            userId: user1.id,
            hospitalId: hospital7.id,
            note: "for emergencies",
        },
    });
    const hospitalNote2 = yield db_setup_1.prisma.hospitalNote.create({
        data: {
            userId: user1.id,
            hospitalId: hospital5.id,
            note: "go here for vaccines",
        },
    });
    const hospitalNote3 = yield db_setup_1.prisma.hospitalNote.create({
        data: {
            userId: user1.id,
            hospitalId: hospital6.id,
            note: "Indy- behaviorist",
        },
    });
    const hospitalNote4 = yield db_setup_1.prisma.hospitalNote.create({
        data: {
            userId: user2.id,
            hospitalId: hospital8.id,
            note: "Biscuit ophthalmologist",
        },
    });
    const hospitalNote5 = yield db_setup_1.prisma.hospitalNote.create({
        data: {
            userId: user3.id,
            hospitalId: hospital4.id,
            note: "Preventive Care",
        },
    });
    const hospitalFavorite1 = yield db_setup_1.prisma.hospitalFavorite.create({
        data: {
            userId: user1.id,
            hospitalId: hospital7.id,
        },
    });
    const hospitalFavorite2 = yield db_setup_1.prisma.hospitalFavorite.create({
        data: {
            userId: user1.id,
            hospitalId: hospital5.id,
        },
    });
    const hospitalFavorite3 = yield db_setup_1.prisma.hospitalFavorite.create({
        data: {
            userId: user1.id,
            hospitalId: hospital6.id,
        },
    });
    const hospitalFavorite4 = yield db_setup_1.prisma.hospitalFavorite.create({
        data: {
            userId: user2.id,
            hospitalId: hospital8.id,
        },
    });
    const hospitalFavorite5 = yield db_setup_1.prisma.hospitalFavorite.create({
        data: {
            userId: user3.id,
            hospitalId: hospital4.id,
        },
    });
});
exports.seedDatabase = seedDatabase;
(0, exports.seedDatabase)()
    .then(() => console.log("Seeding complete"))
    .catch((e) => console.error(e))
    .finally(() => db_setup_1.prisma.$disconnect());
//# sourceMappingURL=seed.js.map