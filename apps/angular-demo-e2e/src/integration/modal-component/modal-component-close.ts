import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Modal basic component$/, function () {
  cy.get("[label='Modal']").click();
  cy.get('goa-button[id=button]').find('button.primary').click({ force: true });

});

Then(/^cs I should be able to validate modal component Title css properties$/, function () {
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-size",remToPx(properties["fs-xl"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-family",remToPx(properties["font-family"]));

});

Then(/^cs I should be able to validate modal component content css properties$/, function () {
  cy.get('div[data-testid="modal-content"]').should("have.css", "margin",remToPx(properties["spacing-3"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-size",remToPx(properties["fs-xl"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-family",remToPx(properties["font-family"]));

});

Then(/^cs cs I should be able to validate modal component close icon css properties$/, function () {
  cy.get('div[data-testid="icon-close"]').should("have.css", "size",remToPx(properties["lh-base"]));
});


function remToPx(rem) {
  return rem.replace("rem", "") * 16 + "px";
}

//function to convery hex to rgb
// return rgb(r, g, b)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : null;
}