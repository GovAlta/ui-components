import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Button size primary component$/, function () {
  cy.get('[path="/button"]').click();
});

Then(/^cs I should be able to validate sizes Compact primary button css property$/, function () {
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", 'background-color', hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["goa-color-interactiveactive"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "border");
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "color", hexToRgb(properties["goa-color-text-light"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

Then(/^cs I should be able to validate sizes Compact Secondary button css property$/, function () {
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "border");
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "color", hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["goa-color-interactiveactive"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

Then(/^cs I should be able to validate sizes Compact tertiary button css property$/, function () {
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "border");
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "color", hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-button[type="tertiary"]').find('button.tertiary.compact').should("have.css", "font-size", remToPx(properties["fs-base"]));
});