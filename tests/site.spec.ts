import { test, expect } from "@playwright/test";
import axe from "axe-core";
declare global {
  interface Window {
    axe: typeof axe;
  }
}
const pages = [
  "",
  "/services",
  "/projects",
  "/about",
  "/contact",
  "/projects/business-reporting-platform",
  "/projects/sales-force-management",
  "/projects/pharmaceutical-market-intelligence",
];
for (const locale of ["en", "ar"]) {
  test(`${locale}: pages, document direction and responsive layouts`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of pages) {
      await page.setViewportSize({ width: 1440, height: 960 });
      const response = await page.goto(`/${locale}${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 960 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${locale}${path} overflows at ${width}`,
        ).toBe(true);
      }
    }
    expect(errors).toEqual([]);
  });
  test(`${locale}: accessibility on main pages`, async ({ page }) => {
    for (const path of pages.slice(0, 5)) {
      await page.goto(`/${locale}${path}`);
      await page.addScriptTag({ content: axe.source });
      const result = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        });
        return result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        }));
      });
      expect(result, `a11y ${locale}${path}`).toEqual([]);
    }
  });
}
test("language switch preserves project page", async ({ page }) => {
  await page.goto("/en/projects/business-reporting-platform");
  await page.getByRole("link", { name: "Switch to Arabic" }).click();
  await expect(page).toHaveURL(/\/ar\/projects\/business-reporting-platform$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/projects\/business-reporting-platform$/);
});
test("mobile menu: keyboard escape, focus and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Services" })
    .click();
  await expect(page).toHaveURL("/en/services");
  await expect(page.locator("#mobile-nav")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});
test("contact form validates and reports unconfigured delivery honestly", async ({
  page,
}) => {
  await page.goto("/en/contact?service=software");
  await expect(page.getByLabel("Project Type")).toHaveValue("software");
  await page.getByRole("button", { name: "Send Project Enquiry" }).click();
  await expect(
    page.getByText("Please enter your name (at least 2 characters)."),
  ).toBeVisible();
  await expect(page.getByLabel("Name", { exact: false }).first()).toBeFocused();
  await page.getByLabel("Name", { exact: false }).first().fill("Test User");
  await page.getByLabel("Company / Organization").fill("Example Organization");
  await page.getByLabel("Email", { exact: false }).fill("test@example.com");
  await page
    .getByLabel("Project Description")
    .fill("We need an operational dashboard.");
  await page.getByRole("button", { name: "Send Project Enquiry" }).click();
  await expect(
    page.getByText("The form is temporarily unavailable.", { exact: false }),
  ).toBeVisible();
  await expect(page.getByLabel("Name", { exact: false }).first()).toHaveValue(
    "Test User",
  );
});
test("API rejects malformed, oversized and invalid requests; never sends without configuration", async ({
  request,
}) => {
  expect((await request.get("/api/contact")).status()).toBe(405);
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(422);
  expect(
    (
      await request.post("/api/contact", {
        data: "{broken",
        headers: { "Content-Type": "application/json" },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/contact", {
        data: "text",
        headers: { "Content-Type": "text/plain" },
      })
    ).status(),
  ).toBe(415);
  expect(
    (
      await request.post("/api/contact", {
        data: { message: "a".repeat(13000) },
      })
    ).status(),
  ).toBe(413);
  const valid = {
    name: "Test User",
    email: "test@example.com",
    projectType: "software",
    organization: "Real Company",
    message: "We need a new business system.",
  };
  expect((await request.post("/api/contact", { data: valid })).status()).toBe(
    503,
  );
  expect(
    (
      await request.post("/api/contact", {
        data: { ...valid, website: "spam.example" },
      })
    ).status(),
  ).toBe(200);
});
test("metadata, canonical URLs, sitemap and social image", async ({
  page,
  request,
}) => {
  await page.goto("/ar/services");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://aw-re.com/ar/services",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://aw-re.com/opengraph-image",
  );
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(
    "https://aw-re.com/ar/projects/business-reporting-platform",
  );
  expect((await request.get("/en/projects/missing")).status()).toBe(404);
  expect((await request.get("/zz")).status()).toBe(404);
});
