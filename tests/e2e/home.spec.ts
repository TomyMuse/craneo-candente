import { test, expect } from "@playwright/test";

test("home renders with primary cta", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Reservar ahora" })).toBeVisible();
  await expect(page.getByText("LAS SALAS")).toBeVisible();
});
