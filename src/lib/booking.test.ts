import { describe, expect, it } from "vitest";
import { getTomorrowDateISO, isDateISO, isSlotTaken, isTimeSlotValid } from "@/lib/booking";

describe("booking helpers", () => {
  it("returns tomorrow in yyyy-mm-dd", () => {
    const value = getTomorrowDateISO(new Date("2026-04-13T10:00:00"));
    expect(value).toBe("2026-04-14");
  });

  it("validates supported slots", () => {
    expect(isTimeSlotValid("10:00 - 12:00")).toBe(true);
    expect(isTimeSlotValid("09:00 - 10:00")).toBe(false);
  });

  it("detects slot occupancy", () => {
    const availability = [{ room_id: 2, date: "2026-04-20", time: "14:00 - 16:00" }];
    expect(isSlotTaken(availability, 2, "2026-04-20", "14:00 - 16:00")).toBe(true);
    expect(isSlotTaken(availability, 1, "2026-04-20", "14:00 - 16:00")).toBe(false);
  });

  it("checks iso date format", () => {
    expect(isDateISO("2026-04-20")).toBe(true);
    expect(isDateISO("20/04/2026")).toBe(false);
  });
});