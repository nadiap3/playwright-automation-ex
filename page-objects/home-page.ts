import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly slider: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("#header");
    this.slider = page.locator("#slider .container");
    this.items = page.locator(".features_items");
  }
  async goto() {
    await this.page.goto("https://automationexercise.com");
    await expect(this.page).toHaveURL("https://automationexercise.com");
  }
  async verifyHomePageIsVisible() {
    await expect(this.header).toBeVisible();
    await expect(this.slider).toBeVisible();
    await expect(this.items).toBeVisible();
  }
}
