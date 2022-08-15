// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic chip component$/, function () {
  cy.get('[path="/chip"]').click();
});

Then(/^cs I should be able to validate basic chip css property$/, function () {
  // cy.get('goa-chip[content="Chip Text"]').find('div[class="chip"]').should("have.css", "background-color", hexToRgb(properties["color-white"]));
  cy.get('goa-chip[content="Chip Text"]').find('div[class="chip"]').should("have.css", "border").should("contain", hexToRgb(properties["chip-error-border-color"]));
  cy.get('goa-chip[content="Chip Text"]').find('div[class="chip"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  // cy.get('goa-chip[content="Chip Text"]').find('div[class="chip"]').should("have.css", "font-size", hexToRgb(properties["chip-font-size"]));
  // cy.get('goa-chip[content="Chip Text"]').find('div[class="chip"]').should("have.css", "font-weight", hexToRgb(properties["fw-regular"]));
});

Then(/^cs I should be able to validat basic chip css property onClick$/, function () {
  cy.get('goa-chip[content="Chip Text"]').eq(0).find('.chip').focus()
  // cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "background-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "outline").should("contain", hexToRgb(properties["goa-color-interactivefocus"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "font-size", remToPx(properties["chip-font-size"]));
  cy.get('goa-chip[content="Chip Text"]').eq(0).should("have.css", "font-weight", (properties["fw-regular"]));
});