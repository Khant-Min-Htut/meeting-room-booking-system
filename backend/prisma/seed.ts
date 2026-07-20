import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: "user123",
      firstName: "Regular",
      lastName: "User",
      role: "USER",
    },
  });

  // Create rooms
  const room1 = await prisma.room.upsert({
    where: { id: "default-room-1" },
    update: {},
    create: {
      id: "default-room-1",
      name: "Conference Room A",
      description: "Large conference room with projector and whiteboard",
      capacity: 20,
      location: "Floor 1",
      amenities: "Projector, Whiteboard, TV, Video Conferencing",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    },
  });

  const room2 = await prisma.room.upsert({
    where: { id: "default-room-2" },
    update: {},
    create: {
      id: "default-room-2",
      name: "Meeting Room B",
      description: "Medium-sized meeting room",
      capacity: 10,
      location: "Floor 2",
      amenities: "TV, Whiteboard",
      imageUrl:
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800",
    },
  });

  const room3 = await prisma.room.upsert({
    where: { id: "default-room-3" },
    update: {},
    create: {
      id: "default-room-3",
      name: "Board Room",
      description: "Executive board room for high-level meetings",
      capacity: 15,
      location: "Floor 3",
      amenities: "Projector, TV, Video Conferencing, Catering Service",
      imageUrl:
        "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800",
    },
  });

  console.log("Seed data created successfully:");
  console.log("Admin user: admin@example.com / admin123");
  console.log("Regular user: user@example.com / user123");
  console.log("Rooms: 3 rooms created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
