import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  isContactValid,
  normalizeContact,
  reservationSchema,
} from "@/lib/validation";
import { toLegacyReservationPayload } from "@/lib/serializers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Faltan datos o son invalidos" },
      { status: 400 },
    );
  }

  const contact = normalizeContact(parsed.data);

  if (!isContactValid(contact.contactName, contact.contactPhone)) {
    return NextResponse.json(
      { error: "Nombre o telefono invalido" },
      { status: 400 },
    );
  }

  const room = await prisma.room.findUnique({ where: { id: parsed.data.room.id } });

  if (!room) {
    return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
  }

  try {
    const created = await prisma.reservation.create({
      data: {
        roomId: room.id,
        date: parsed.data.date,
        timeSlot: parsed.data.time,
        contactName: contact.contactName,
        contactPhone: contact.contactPhone,
      },
      include: {
        room: true,
      },
    });

    return NextResponse.json(toLegacyReservationPayload(created), { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Horario ya reservado" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "No se pudo crear la reserva" },
      { status: 500 },
    );
  }
}
