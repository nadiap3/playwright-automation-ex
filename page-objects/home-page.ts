import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly slider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("#header");
    this.slider = page.locator("#slider .container");
  }
  async goto() {
    await this.page.goto("https://automationexercise.com");
    await expect(this.page).toHaveURL("https://automationexercise.com");
  }
}
