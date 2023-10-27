import { expect, test } from "@playwright/test";

test.describe("Top画面からNewsへ", () => {
  test("Top画面からNewsへ遷移できる", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("banner").getByRole("link").nth(1).click();
    await page.waitForURL("http://localhost:3000/news");
    expect(page.url()).toBe("http://localhost:3000/news");
  });
});
