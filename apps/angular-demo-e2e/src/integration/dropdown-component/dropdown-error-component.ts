import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to dropdown error component$/, function () {
  cy.get("[label='Dropdown']").click();
});

Then(/^cs I should be able to validate dropdown error button css property$/, function () {
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["goa-color-interactiveerror"]));
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "border");
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "border").should("contain",hexToRgb(properties["goa-color-interactiveerror"]));
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-input[id="colors2-dropdown-input"]').find('div.goa-input.variant--goa.type--text.error').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
});

Then(/^cs I should be able to validate dropdown error menu css property$/, function () {
  cy.get('goa-input[id="colors2-dropdown-input"]').find('input[class="input--goa"]').click({ force: true, multiple: true });
  cy.get('goa-input[id="colors2-dropdown-input"]').get('ul[data-testid="dropdown-menu"]').find("li[data-index='0']").contains("red");
  cy.get('goa-input[id="colors2-dropdown-input"]').get('ul[data-testid="dropdown-menu"]').find("li[data-index='1']").contains("green");
  cy.get('goa-input[id="colors2-dropdown-input"]').get('ul[data-testid="dropdown-menu"]').find("li[data-index='2']").contains("blue");
  cy.get('goa-input[id="colors2-dropdown-input"]').get('ul[data-testid="dropdown-menu"]').find('li[data-index="1"]').eq(1).click({ force: true, multiple: true }).should("have.css", "background").should("contain", hexToRgb(properties["goa-color-interactivehover"]));
});