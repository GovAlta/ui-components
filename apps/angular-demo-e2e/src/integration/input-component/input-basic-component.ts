// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic component$/, function () {
  cy.get("[label='Input']").click();
});

Then(/^cs I should be able to validate box css property$/, function () {
  cy.get('goa-input[name="foo"]').shadow().find('input[class="input--goa"]').should("have.css", "box-sizing", properties["box-sizing"]);
});

// Then(/^cs I should be able to validate box css property when clicked border color change$/, function () {
//   cy.get('goa-input').get('#foo').shadow().find('input[class="input--goa"]').should("have.css", "--goa-color-interactive-focus");
// });