import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    select: {
      roomId: true,
      date: true,
      timeSlot: true,
    },
  });

  return NextResponse.json(
    reservations.map((entry) => ({
      room_id: entry.roomId,
      date: entry.date,
      time: entry.timeSlot,
    })),
  );
}
