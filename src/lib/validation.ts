import { z } from "zod";
import { isDateISO, isTimeSlotValid } from "@/lib/booking";

const roomSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const reservationSchema = z.object({
  room: roomSchema,
  date: z.string().refine(isDateISO, { message: "Fecha invalida" }),
  time: z.string().refine(isTimeSlotValid, { message: "Horario invalido" }),
  contact: z.string().optional(),
  contactName: z.string().min(3).max(120).optional(),
  contactPhone: z
    .string()
    .regex(/^[0-9\s-]{8,20}$/)
    .optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1).max(80).optional().default("admin"),
  password: z.string().min(4).max(120),
});

export function normalizeContact(input: {
  contact?: string;
  contactName?: string;
  contactPhone?: string;
}): { contactName: string; contactPhone: string } {
  if (input.contactName && input.contactPhone) {
    return {
      contactName: input.contactName.trim(),
      contactPhone: input.contactPhone.trim(),
    };
  }

  const fallback = input.contact ?? "";
  const [name = "", phone = ""] = fallback.split(" - ");
  const cleanName = name.trim();
  const cleanPhone = phone.trim();

  return { contactName: cleanName, contactPhone: cleanPhone };
}

export function isContactValid(name: string, phone: string): boolean {
  if (name.trim().length < 3) return false;
  const compactPhone = phone.replace(/[\s-]/g, "");
  return /^\d{8,20}$/.test(compactPhone);
}
