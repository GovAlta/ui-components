import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Modal basic component$/, function () {
  cy.get("[label='Modal']").click();
  cy.get('goa-button[id=button2]').find('button.primary').click({ force: true });

});

Then(/^cs I should be able to validate modal component Title css properties$/, function () {
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-size", remToPx(properties["fs-xl"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-title"]').should("have.css", "font-family", remToPx(properties["font-family"]));

});

Then(/^cs I should be able to validate modal component content css properties$/, function () {
  cy.get('div[data-testid="modal-content"]').should("have.css", "margin", remToPx(properties["spacing-3"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-size", remToPx(properties["fs-xl"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('div[data-testid="modal-content"]').should("have.css", "font-family", remToPx(properties["font-family"]));

});

Then(/^cs cs I should be able to validate modal component Primary button css properties$/, function () {
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", 'background-color', hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["goa-color-interactiveactive"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "border");
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "color", hexToRgb(properties["goa-color-text-light"]));
  cy.get('goa-button[type="primary"]').find('button.primary.compact').should("have.css", "font-size", remToPx(properties["fs-base"]));
});

Then(/^cs cs I should be able to validate modal component Secondary button css properties$/, function () {
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "border");
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "border-radius", remToPx(properties["border-radius"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "height", remToPx(properties["button-height-compact"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "color", hexToRgb(properties["goa-color-interactive"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').eq(0).rightclick({ force: true }).should("have.css", "border-color", hexToRgb(properties["goa-color-interactivehover"]));
  cy.get('goa-button[type="secondary"]').find('button.secondary.compact').should("have.css", "font-size", remToPx(properties["fs-base"]))
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