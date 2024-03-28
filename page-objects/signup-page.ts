import { expect, type Locator, type Page } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly enterAccountInformationHeader: Locator;
  readonly title: Locator;
  readonly password: Locator;
  readonly birthdayDay: Locator;
  readonly birthdayDayValue: Locator;
  readonly birthdayMonth: Locator;
  readonly birthdayMonthValue: Locator;
  readonly birthdayYear: Locator;
  readonly birthdayYearValue: Locator;
  readonly newsletterBox: Locator;
  readonly optinBox: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;
  readonly address: Locator;
  readonly address2: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly createAccountBtn: Locator;
  readonly continueBtn: Locator;
  readonly accountCreated: Locator;

  constructor(page: Page) {
    this.page = page;
    this.enterAccountInformationHeader = page.locator(".login-form b");
    this.title = page.locator("#id_gender1");
    this.password = page.locator('[data-qa="password"]');
    this.birthdayDay = page.locator('[data-qa="days"]');
    this.birthdayDayValue = page.locator('[data-qa="days"] [value="1"]');
    this.birthdayMonth = page.locator('[data-qa="months"]');
    this.birthdayMonthValue = page.locator('[data-qa="months"] [value="1"]');
    this.birthdayYear = page.locator('[data-qa="years"]');
    this.birthdayYearValue = page.locator('[data-qa="years"] [value=1990"]');
    this.newsletterBox = page.locator("#newsletter");
    this.optinBox = page.locator("#optin");
    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');
    this.address = page.locator('[data-qa="address"]');
    this.address2 = page.locator('[data-qa="address2"]');
    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');
    this.createAccountBtn = page.locator('[data-qa="create-account"]');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    this.accountCreated = page.locator('[data-qa="account-created"]');
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/login");
  }

  async verifyEnterAccountInformationText() {
    const text = await this.enterAccountInformationHeader.first().innerText();
    expect(text).toContain("ENTER ACCOUNT INFORMATION");
  }

  async createAccount() {
    await this.title.click();
    await this.password.fill("password");
    await this.birthdayDay.selectOption("20");
    await this.birthdayMonth.selectOption("3");
    await this.birthdayYear.selectOption("1990");
    await this.newsletterBox.click();
    await this.optinBox.click();
    await this.firstName.fill("Mario");
    await this.lastName.fill("Smith");
    await this.company.fill("Google");
    await this.address.fill("123 st");
    await this.address2.fill("building B");
    await this.country.selectOption("United States");
    await this.state.fill("California");
    await this.city.fill("LA");
    await this.zipcode.fill("90210");
    await this.mobileNumber.fill("555-555-5555");
    await this.createAccountBtn.click();
    const accountCreated = await this.accountCreated;
    await expect(accountCreated).toBeVisible();
  }
}
