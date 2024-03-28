import { test, expect, type Page } from "@playwright/test";
import HeaderComponent from "../components/header.component";
import { LoginPage } from "../page-objects/login-page";
import { SignupPage } from "../page-objects/signup-page";
import { HomePage } from "../page-objects/home-page";

test.describe("User account registration", () => {
  let headerComponent: HeaderComponent;
  let loginPage: LoginPage;
  let signupPage: SignupPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    headerComponent = new HeaderComponent(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.verifyHomePageIsVisible();
    await headerComponent.btnSignup.click();
  });

  test("user can register a new account", async ({ page }) => {
    await loginPage.verifySignupFormText();
    await loginPage.newUserSignup("test", "1test@hhi.com");
    await signupPage.verifyEnterAccountInformationText();
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
    await loginPage.newUserSignup("test", "2test@hdii.com");
    await signupPage.createAccount();
    await expect(page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await signupPage.continueBtn.click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await headerComponent.btnLogout.click();
    await headerComponent.btnSignup.click();
    await loginPage.loginToExistingAccount("2test@hdii.com", "password");
    await headerComponent.btnDeleteAccount.click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/delete_account"
    );
  });

  test("user gets error message when trying to login with incorrect credentials", async ({
    page,
  }) => {
    await loginPage.verifyInvalidLogin();
  });

  test("user can log out", async ({ page }) => {
    await loginPage.newUserSignup("test", "logouttest@hdiii.com");
    await signupPage.createAccount();
    await expect(page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await signupPage.continueBtn.click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await headerComponent.btnLogout.click();
    await headerComponent.btnSignup.click();
    await loginPage.loginToExistingAccount("logouttest@hdiii.com", "password");
    await headerComponent.btnDeleteAccount.click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/delete_account"
    );
  });
  test("register user with existing email", async ({ page }) => {
    await loginPage.newUserSignup("existing", "existing@test.com");
    await signupPage.createAccount();
    await expect(page).toHaveURL(
      "https://automationexercise.com/account_created"
    );
    await signupPage.continueBtn.click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await headerComponent.btnLogout.click();
    await headerComponent.btnSignup.click();
    await loginPage.newUserSignup("existing", "existing@test.com");
    await loginPage.verifyExistingEmail();
    await loginPage.loginToExistingAccount("existing@test.com", "password");
    await headerComponent.btnDeleteAccount.click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/delete_account"
    );
  });
});
