// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic chip component$/, function () {
  cy.get("[label='Chip']").click();
});

Then(/^cs I should be able to validate basic chip css property$/, function () {
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "background-color", hexToRgb(properties["color-white"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "border", "1px solid" + hexToRgb(properties["#949494"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "font-size", hexToRgb(properties["chip-font-size"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "font-weight", hexToRgb(properties["fw-regular"]));


});

Then(/^cs I should be able to validat basic chip css property onClick$/, function () {
  cy.get('goa-chip[content="Chip Text"]').eq(0).rightclick({ force: true })
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "background-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "outline", "2px solid" + hexToRgb(properties["goa-color-interactive--focus"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "font-size", hexToRgb(properties["chip-font-size"]));
  cy.get('goa-chip[content="Chip Text"]').find('.chip').should("have.css", "font-weight", hexToRgb(properties["fw-regular"]));
  // cy.get('goa-chip.div[data-testid="chip"]').should("have.css", "background-

});

// Then(/^cs I should be able to validate box css property when clicked border color change$/, function () {
//   cy.get('goa-input').get('#foo').shadow().find('input[class="input--goa"]').should("have.css", "--goa-color-interactive-focus");
// });
function remToPx(rem) {
  return rem.replace("rem", "") * 16 + "px";
}

//function to convery hex to rgb
// return rgb(r, g, b)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : null;
}