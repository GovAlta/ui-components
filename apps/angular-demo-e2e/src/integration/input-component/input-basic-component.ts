// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic component$/, function () {
  cy.get("[label='Input']").click();
});

Then(/^cs I should be able to validate basic box css property$/, function () {
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').should("have.css", "border-color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="foo"]').find('div.goa-input.variant--goa.type--text').rightclick().should("have.css", "border-color", hexToRgb(properties["color-gray-600"]));
  cy.get('goa-input[name="foo"]').find('input[class="input--goa"]').trigger('mouseover').should("have.css", "border-color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="foo"]').find('div[class="goa-input variant--goa type--text"]').click().should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-input[name="foo"]').find('input').focus();
  cy.get('goa-input[name="foo"]').find('.goa-input').should("have.css", "box-shadow", hexToRgb(properties["goa-color-interactivefocus"]) + " 0px 0px 0px 3px");
});