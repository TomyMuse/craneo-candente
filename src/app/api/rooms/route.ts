import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const rooms = await prisma.room.findMany({ orderBy: { id: "asc" } });

  return NextResponse.json(
    rooms.map((room) => ({
      id: room.id,
      name: room.name,
      description: room.description,
      details: room.details,
      price: room.price,
      image: room.imageUrl,
    })),
  );
}
