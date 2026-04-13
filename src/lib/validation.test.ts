import { describe, expect, it } from "vitest";
import { isContactValid, normalizeContact } from "@/lib/validation";

describe("validation helpers", () => {
  it("normalizes explicit contact fields", () => {
    const normalized = normalizeContact({
      contactName: "Juan Perez",
      contactPhone: "11 1234 5678",
    });

    expect(normalized).toEqual({
      contactName: "Juan Perez",
      contactPhone: "11 1234 5678",
    });
  });

  it("normalizes fallback contact string", () => {
    const normalized = normalizeContact({ contact: "Ana - 1144448888" });
    expect(normalized.contactName).toBe("Ana");
    expect(normalized.contactPhone).toBe("1144448888");
  });

  it("validates contact constraints", () => {
    expect(isContactValid("Juan Perez", "11 1234 5678")).toBe(true);
    expect(isContactValid("Jo", "11 1234 5678")).toBe(false);
    expect(isContactValid("Juan Perez", "abc")).toBe(false);
  });
});