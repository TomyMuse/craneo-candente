import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultRooms = [
  {
    id: 1,
    name: "SALA 1",
    description: "THE BEAST",
    details: ["Marshall DSL100H", "Ampeg SVT-CL", "Pearl Masters"],
    price: 15000,
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "SALA 2",
    description: "VINTAGE",
    details: ["Vox AC30 C2", "Fender Bassman", "Gretsch Renown"],
    price: 12000,
    imageUrl:
      "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "SALA 3",
    description: "HI-GAIN",
    details: ["EVH 5150 III", "Orange Rocker", "Tama Starclassic"],
    price: 14000,
    imageUrl:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "SALA 4",
    description: "STANDARD",
    details: ["Roland JC-120", "Hartke HD500", "Yamaha Stage"],
    price: 10000,
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
  },
];

async function runSeed() {
  const adminUsername = process.env.ADMIN_SEED_USERNAME ?? "admin";
  const adminPasswordHash =
    process.env.ADMIN_SEED_PASSWORD_HASH ?? bcrypt.hashSync("1234", 10);

  for (const room of defaultRooms) {
    const roomPayload = {
      ...room,
      details: [...room.details],
    };

    await prisma.room.upsert({
      where: { id: room.id },
      update: roomPayload,
      create: roomPayload,
    });
  }

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash: adminPasswordHash },
    create: { username: adminUsername, passwordHash: adminPasswordHash },
  });

  console.log("Seed complete: rooms and admin user are ready.");
}

runSeed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
