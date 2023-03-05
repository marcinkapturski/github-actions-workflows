import { Given, When } from "@wdio/cucumber-framework";
import config from "../config/wdio.shared.conf";

import CommonComponents from "./pageobjects/common";

Given("I visit the home page", async () => {
  await browser.url(config.baseUrl);
});

When("The title includes {string}", async (title) => {
  await CommonComponents.containTitle(title);
});
