import type { Reservation, Room } from "@prisma/client";

export type ReservationWithRoom = Reservation & { room: Room };

export function toLegacyReservationPayload(item: ReservationWithRoom) {
  return {
    id: item.id,
    room: {
      id: item.room.id,
      name: item.room.name,
    },
    date: item.date,
    time: item.timeSlot,
    contact: `${item.contactName} - ${item.contactPhone}`,
  };
}
