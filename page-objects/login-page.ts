import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailLogin: Locator;
  readonly passwordLogin: Locator;
  readonly loginBtn: Locator;
  readonly nameSignup: Locator;
  readonly emailSignup: Locator;
  readonly signupBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLogin = page.locator('[data-qa="login-email"]');
    this.passwordLogin = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');
    this.nameSignup = page.locator('[data-qa="signup-name"]');
    this.emailSignup = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/login");
  }

  async newUserSignup(name: string, email: string) {
    await this.nameSignup.fill(name);
    await this.emailSignup.fill(email);
    await this.signupBtn.click();
    await expect(this.page).toHaveURL("https://automationexercise.com/signup");
  }
}
