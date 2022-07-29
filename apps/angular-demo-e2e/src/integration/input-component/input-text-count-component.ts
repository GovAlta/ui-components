// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic component$/, function () {
  cy.get('[path="/input"]').click();
});


Then(/^cs I should be able to validate css properties of a character count TextArea$/, function () {
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "border-color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "border-radius", properties["input-border-radius-0px"]);
  cy.get('goa-input[name="firstname"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').eq(5).type("This is a test");
  cy.get('goa-input[name="firstname"]').get('div[class="counter"]').contains("14");
  cy.get('goa-input[name="firstname"]').get('div[class="counter"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[name="firstname"]').get('div[class="counter"]').should("have.css", "font-size", remToPx(properties["fs-sm"]));
  cy.get('goa-input[name="firstname"]').get('div[class="counter"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[name="firstname"]').get('div[class="counter"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-input[name="firstname"]').eq(1).find('input').focus();
  cy.get('goa-input[name="firstname"]').eq(1).find('.goa-input').should("have.css", "box-shadow").should("contain",hexToRgb(properties["goa-color-interactivefocus"]));
});

Then(/^cs I should be able to validate css properties of a maxcharacter count TextArea$/, function () {
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "box-sizing", properties["box-sizing"]);
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "border-color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').should("have.css", "border-radius", properties["input-border-radius-0px"]);
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').eq(6).type("This is a test", { force: true });
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter"]').contains("14/20");
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter"]').should("have.css", "font-size", remToPx(properties["fs-sm"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-input[maxcharcount="20"]').get('div[class="goa-input variant--goa type--text"]').find('input[class="input--goa"]').eq(6).type("This is a test that fails as its more than 20 limit of characters", { force: true });
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter counter-error"]').contains("79/20");
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter counter-error"]').should("have.css", "color", hexToRgb(properties["goa-color-interactiveerror"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter counter-error"]').should("have.css", "font-size", remToPx(properties["fs-sm"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter counter-error"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-input[maxcharcount="20"]').find('div[class="counter counter-error"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-input[maxcharcount="20"]').eq(0).find('input').focus();
  cy.get('goa-input[maxcharcount="20"]').eq(0).find('.goa-input').should("have.css", "box-shadow", hexToRgb(properties["goa-color-interactivefocus"]) + " 0px 0px 0px 3px");
});