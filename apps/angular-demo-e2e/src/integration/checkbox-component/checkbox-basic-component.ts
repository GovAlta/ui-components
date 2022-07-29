import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to checkbox Type basic component$/, function () {
  cy.get('[path="/checkbox"]').click();
});

Then(/^cs I should be able to validate basic checkbox css property$/, function () {
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "border");
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "border").should("contain", hexToRgb(properties["color-gray-600"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "font-family", properties["font-family"]);
});

Then(/^cs I should be able to validate checked checkbox css property$/, function () {
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "border");
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container').should("have.css", "border").should("contain", hexToRgb(properties["color-gray-600"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox').find('div.goa-checkbox-container.goa-checkbox--selected').should("have.css", "background-color", hexToRgb(properties["goa-color-interactive"]));
});

Then(/^cs I should be able to validate disabled checkbox css property$/, function () {
  cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "border");
  cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').find('div.goa-checkbox-container').should("have.css", "border").should('contain', hexToRgb(properties["color-gray-400"]));
  // cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "font-family", properties["font-family"]);
});

Then(/^cs I should be able to validate error checkbox css property$/, function () {
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "border");
  // cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "border", "1px solid " + hexToRgb(properties["goa-color-status-emergency"]));
  // cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "font-family", properties["font-family"]);
});