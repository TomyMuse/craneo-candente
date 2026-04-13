import { test, expect } from "@playwright/test";

test("booking flow works with mocked api", async ({ page }) => {
  await page.route("**/api/rooms", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: 1,
          name: "SALA 1",
          description: "THE BEAST",
          details: ["Marshall"],
          price: 15000,
          image: "https://example.com/sala.jpg",
        },
      ]),
    });
  });

  await page.route("**/api/availability", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });

  await page.route("**/api/reservations", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        id: "r1",
        room: { id: 1, name: "SALA 1" },
        date: "2026-04-20",
        time: "10:00 - 12:00",
        contact: "Juan - 1144448888",
      }),
    });
  });

  await page.goto("/reservar");
  await expect(page.getByText("SALA 1")).toBeVisible();
  await page.getByRole("button", { name: /THE BEAST/i }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "10:00 - 12:00" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();

  await page.getByPlaceholder("Ej: Juan Perez").fill("Juan Perez");
  await page.getByPlaceholder("Ej: 11 1234 5678").fill("1144448888");
  await page.getByRole("button", { name: /confirmar reserva/i }).click();

  await expect(page.getByText(/Reserva confirmada/i)).toBeVisible();
});
