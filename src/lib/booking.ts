import { TIME_SLOTS } from "@/lib/constants";

function toLocalISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTomorrowDateISO(date = new Date()): string {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return toLocalISODate(d);
}

export function isTimeSlotValid(value: string): boolean {
  return TIME_SLOTS.includes(value as (typeof TIME_SLOTS)[number]);
}

export function isDateISO(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function isSlotTaken(
  availability: Array<{ room_id: number; date: string; time: string }>,
  roomId: number,
  date: string,
  time: string,
): boolean {
  return availability.some(
    (slot) => slot.room_id === roomId && slot.date === date && slot.time === time,
  );
}