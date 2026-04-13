import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    room: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    reservation: {
      create: vi.fn(),
    },
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

import { GET as getRooms } from "@/app/api/rooms/route";
import { POST as postReservation } from "@/app/api/reservations/route";

describe("api contract", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns rooms in legacy shape", async () => {
    prismaMock.room.findMany.mockResolvedValueOnce([
      {
        id: 1,
        name: "SALA 1",
        description: "THE BEAST",
        details: ["Amp"],
        price: 15000,
        imageUrl: "https://example.com/a.jpg",
      },
    ]);

    const response = await getRooms();
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload[0]).toMatchObject({
      id: 1,
      name: "SALA 1",
      image: "https://example.com/a.jpg",
    });
  });

  it("rejects invalid reservation payload", async () => {
    const request = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await postReservation(request);
    expect(response.status).toBe(400);
  });

  it("creates reservation and preserves legacy response fields", async () => {
    prismaMock.room.findUnique.mockResolvedValueOnce({ id: 1, name: "SALA 1" });
    prismaMock.reservation.create.mockResolvedValueOnce({
      id: "abc",
      date: "2026-04-20",
      timeSlot: "10:00 - 12:00",
      contactName: "Juan Perez",
      contactPhone: "1144448888",
      room: { id: 1, name: "SALA 1" },
    });

    const request = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: { id: 1, name: "SALA 1" },
        date: "2026-04-20",
        time: "10:00 - 12:00",
        contactName: "Juan Perez",
        contactPhone: "1144448888",
      }),
    });

    const response = await postReservation(request);
    expect(response.status).toBe(201);

    const payload = await response.json();
    expect(payload).toEqual({
      id: "abc",
      room: { id: 1, name: "SALA 1" },
      date: "2026-04-20",
      time: "10:00 - 12:00",
      contact: "Juan Perez - 1144448888",
    });
  });
});
