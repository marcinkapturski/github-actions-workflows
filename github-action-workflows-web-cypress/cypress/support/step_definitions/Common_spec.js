import { Given } from "@badeball/cypress-cucumber-preprocessor";

import Application from "./dom/application";

Given("I open the {string}", (page) => {
  Application.navigateTo(page);
});

Given("The title includes {string}", (title) => {
  Application.verifyTitle(title);
});
