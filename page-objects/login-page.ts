import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly signupFormHeader: Locator;
  readonly emailLogin: Locator;
  readonly passwordLogin: Locator;
  readonly loginBtn: Locator;
  readonly nameSignup: Locator;
  readonly emailSignup: Locator;
  readonly signupBtn: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly existingEmailMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupFormHeader = page.locator(".signup-form h2");
    this.emailLogin = page.locator('[data-qa="login-email"]');
    this.passwordLogin = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');
    this.nameSignup = page.locator('[data-qa="signup-name"]');
    this.emailSignup = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');
    this.invalidCredentialsMessage = page.locator('[action="/login"] p');
    this.existingEmailMessage = page.locator('[action="/signup"] p');
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/login");
  }

  async verifySignupFormText() {
    const text = await this.signupFormHeader.innerText();
    expect(text).toContain("New User Signup!");
  }

  async newUserSignup(name: string, email: string) {
    await this.nameSignup.fill(name);
    await this.emailSignup.fill(email);
    await this.signupBtn.click();
    await expect(this.page).toHaveURL("https://automationexercise.com/signup");
  }

  async loginToExistingAccount(email: string, password: string) {
    await this.emailLogin.fill(email);
    await this.passwordLogin.fill(password);
    await this.loginBtn.click();
  }

  async verifyInvalidLogin() {
    await this.loginToExistingAccount("invalid@test.com", "wrongpassword");
    const errorMessage: string =
      await this.invalidCredentialsMessage.innerText();
    expect(errorMessage).toContain("Your email or password is incorrect!");
  }
  async verifyExistingEmail() {
    const errorMessage: string = await this.existingEmailMessage.innerText();
    expect(errorMessage).toContain("Email Address already exist!");
  }
}
