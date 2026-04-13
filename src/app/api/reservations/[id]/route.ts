import { NextRequest, NextResponse } from "next/server";
import { getSessionTokenFromRequest, getValidSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const token = getSessionTokenFromRequest(req);

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const session = await getValidSession(token);

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await prisma.reservation.deleteMany({ where: { id } });

  if (result.count === 0) {
    return NextResponse.json(
      { error: "Reserva no encontrada" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}