import { NextRequest, NextResponse } from "next/server";
import { getSessionTokenFromRequest, getValidSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toLegacyReservationPayload } from "@/lib/serializers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = getSessionTokenFromRequest(req);

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const session = await getValidSession(token);

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const date = req.nextUrl.searchParams.get("date");
  const month = req.nextUrl.searchParams.get("month");

  const where: {
    date?: string | { startsWith: string };
  } = {};

  if (date) {
    where.date = date;
  } else if (month) {
    where.date = { startsWith: month };
  }

  const rows = await prisma.reservation.findMany({
    where,
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
    include: { room: true },
  });

  return NextResponse.json(rows.map(toLegacyReservationPayload));
}