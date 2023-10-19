import { test, expect } from "@playwright/test";

test.describe("Top画面", () => {
  test("スライドしょー", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page
      .getByText(
        "Cから始めた一般プログラマーです。 RustとWeb系が特に好きです。",
      )
      .click();
    await page.getByRole("banner").getByRole("link").nth(1).click();
    await page.getByRole("link", { name: "test test 2023-07-30" }).click();
    expect(
      await page
        .getByRole("heading", { name: "test", exact: true })
        .textContent(),
    ).toBe("test");
  });
});
