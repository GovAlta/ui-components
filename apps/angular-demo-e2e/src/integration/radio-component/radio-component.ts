import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Radio basic component$/, function () {
  cy.get('[path="/radio"]').click();
});

Then(/^cs I should be able to validate radio basic button css property when unchecked$/, function () {
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "border");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "border-radius", "50%");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "border").should("contain",hexToRgb(properties["color-gray-600"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "width", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "height", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio').find('div.goa-radio-icon').should("have.css", "font-family", properties["font-family"]);

});

Then(/^cs I should be able to validate radio basic button css property when checked$/, function () {
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "border");
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "border-radius", "50%");
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "border").should("contain",hexToRgb(properties["goa-color-interactive--active"]));
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "width", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "height", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-radio-group[name="color"]').find('label[data-testid="radio-option-orange"]').find('div.goa-radio-icon').should("have.css", "font-family", properties["font-family"]);
});

Then(/^cs I should be able to validate radio error button css property when unchecked$/, function () {
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border-radius", "50%");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border").should("contain",hexToRgb(properties["goa-color-status-emergency"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "width", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "height", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "font-family", properties["font-family"]);
});

Then(/^cs I should be able to validate radio error button css property when checked$/, function () {
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border-radius", "50%");
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "border").should("contain",hexToRgb(properties["goa-color-status-emergency"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "width", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "height", remToPx(properties["goa-radio-diameter"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-radio-group[name="color"]').find('label.goa-radio.goa-radio--error').find('div.goa-radio-icon').should("have.css", "font-family", properties["font-family"]);
});