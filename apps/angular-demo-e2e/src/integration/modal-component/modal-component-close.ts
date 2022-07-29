import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Modal basic component$/, function () {
  cy.get('[path="/modal"]').click();
  cy.get('goa-button[id=button]').find('button.primary').click({ force: true });

});

Then(/^cs I should be able to validate modal component Title css properties$/, function () {
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-size", remToPx(properties["fs-xl"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-family", properties["font-family"]);
});

Then(/^cs I should be able to validate modal component content css properties$/, function () {
  cy.get('div[data-testid="modal-content"]').should("have.css", "margin", remToPx(properties["model-content-margin"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-family", properties["font-family"]);
});

// Then(/^cs I should be able to validate modal component close icon css properties$/, function () {
//   cy.get('div.modal-close').find('button[class="goa-icon-button goa-icon-button--color"').should("have.css")
//   // , "size", remToPx(properties["lh-base"])); find('goa-icon-button[data-testid="modal-close-button"]').
//   // cy.get('div[data-testid="icon-close"]').should("have.css", "size", remToPx(properties["lh-base"]));
//   cy.get('div[data-testid="icon-close"]').should("have.css", "border-radius", remToPx(properties["border-radius-lg"]));
// });