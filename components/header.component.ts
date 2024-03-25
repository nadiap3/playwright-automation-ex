import type { Page, Locator } from "@playwright/test";

export default class HeaderComponent {
  readonly page: Page;
  readonly headerSection: Locator;
  readonly btnProducts: Locator;
  readonly btnSignup: Locator;
  readonly btnCart: Locator;
  readonly btnTestCases: Locator;
  readonly btnApiTesting: Locator;
  readonly btnVideoTutorials: Locator;
  readonly btnContactUs: Locator;
  readonly btnLogout: Locator;
  readonly btnDeleteAccount: Locator;

  pageToLocatorMap: { [key: string]: Locator };

  constructor(page: Page) {
    this.page = page;
    this.headerSection = page.locator("#header");
    this.btnProducts = page.locator('.navbar-nav [href="/products"]');
    this.btnSignup = page.locator(".navbar-nav .fa-lock");
    this.btnCart = page.locator('.navbar-nav [href="/view_cart"]');
    this.btnTestCases = page.locator('.navbar-nav [href="/test_cases"]');
    this.btnApiTesting = page.locator('.navbar-nav [href="/api_list"]');
    this.btnVideoTutorials = page.locator(
      '.navbar-nav [href="https://www.youtube.com/c/AutomationExercise"]'
    );
    this.btnContactUs = page.locator('.navbar-nav [href="/contact_us"]');
    this.btnLogout = page.locator('.navbar-nav [href="/logout"]');
    this.btnDeleteAccount = page.locator(
      '.navbar-nav [href="/delete_account"]'
    );

    this.pageToLocatorMap = {
      products: this.btnProducts,
      signupLogin: this.btnSignup,
      cart: this.btnCart,
      testCases: this.btnTestCases,
      apiTesting: this.btnApiTesting,
      videoTutorials: this.btnVideoTutorials,
      contactUs: this.btnContactUs,
      logout: this.btnLogout,
      deleteAccount: this.btnDeleteAccount,
    };
  }

  public async navigateTo(page: string) {
    await this.pageToLocatorMap[page].click();
  }
}
