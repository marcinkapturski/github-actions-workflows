/* global cy, Cypress */

const navigateTo = (page) => {
  cy.visit(Cypress.env("home_page"));
};

const verifyTitle = (title) => {
  cy.title().should("include", title);
};

const Application = {
  navigateTo,
  verifyTitle,
};

export default Application;
