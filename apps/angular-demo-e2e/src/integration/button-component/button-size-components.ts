import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Button Type primary component$/, function () {
  cy.get("[ng-reflect-label='Button']").click();
});

Then(/^cs I should be able to validate sizes Compact primary button css property$/, function () {
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "border");
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "color", hexToRgb(properties["goa-color-text-light"]));
  cy.get('goa-button[type="primary"]').shadow().find('button[class="primary compact"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

Then(/^cs I should be able to validate sizes Compact Secondary button css property$/, function () {
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "border");
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "color", hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="secondary"]').shadow().find('button[class="secondary compact"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

Then(/^cs I should be able to validate sizes Compact tertiary button css property$/, function () {
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "border");
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "color", hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="tertiary"]').shadow().find('button[class="tertiary compact"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

function remToPx(rem) {
  return rem.replace("rem", "") * 16 + "px";
}

//function to convery hex to rgb
// return rgb(r, g, b)
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : null;
}