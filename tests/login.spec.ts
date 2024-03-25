import { test, expect, type Page } from "@playwright/test";
import HeaderComponent from "../components/header.component";
import { LoginPage } from "../page-objects/login-page";

test.describe("User account registration", () => {
  let headerComponent: HeaderComponent;
  let signupLoginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    headerComponent = new HeaderComponent(page);
    signupLoginPage = new LoginPage(page);
    await page.goto("http://automationexercise.com/");
  });

  test("should allow me to register a new user account", async ({ page }) => {
    await headerComponent.btnSignup.click();
    await signupLoginPage.newUserSignup("test", "test@hi.com");
  });
});
