import { test, expect, type Page } from "@playwright/test";
import HeaderComponent from "../components/header.component";
import { LoginPage } from "../page-objects/login-page";
import { SignupPage } from "../page-objects/signup-page";

test.describe("User account registration", () => {
  let headerComponent: HeaderComponent;
  let loginPage: LoginPage;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    headerComponent = new HeaderComponent(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    await page.goto("http://automationexercise.com/");
  });

  test("user can register a new account", async ({ page }) => {
    await headerComponent.btnSignup.click();
    await loginPage.newUserSignup("test", "1test@hdiii.com");
    await signupPage.createAccount();
    await expect(page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await signupPage.continueBtn.click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await headerComponent.btnDeleteAccount.click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/delete_account"
    );
  });
  test("user can login with correct username and password", async ({
    page,
  }) => {
    await headerComponent.btnSignup.click();
    await loginPage.newUserSignup("test", "2test@hdiii.com");
    await signupPage.createAccount();
    await expect(page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await signupPage.continueBtn.click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await headerComponent.btnLogout.click();
    await headerComponent.btnSignup.click();
    await loginPage.loginToExistingAccount("2test@hdiii.com", "password");
    await headerComponent.btnDeleteAccount.click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/delete_account"
    );
  });
});
