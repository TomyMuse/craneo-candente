import { test, expect } from "@playwright/test";

test("admin daily view and delete", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "cc_admin_session",
      value: "fake-session",
      domain: "localhost",
      path: "/",
      httpOnly: true,
    },
  ]);

  await page.route("**/api/admin/reservations**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "abc",
          room: { id: 1, name: "SALA 1" },
          date: "2026-04-20",
          time: "10:00 - 12:00",
          contact: "Juan Perez - 1144448888",
        },
      ]),
    });
  });

  await page.route("**/api/reservations/abc", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });

  page.once("dialog", (dialog) => dialog.accept());

  await page.goto("/admin");
  await expect(page.getByText("ADMIN RESERVAS")).toBeVisible();
  await expect(page.getByRole("button", { name: /Eliminar/i }).first()).toBeVisible();
  await page.getByRole("button", { name: /Eliminar/i }).first().click();
});
