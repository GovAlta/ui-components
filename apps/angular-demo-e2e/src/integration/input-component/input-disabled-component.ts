// Test the input component using cypress

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Basic component$/, function () {
  cy.get("[label='Input']").click();
});

Then(
  /^cs I should be able to validate disabled icons box css property$/,
  function () {
    cy.get('goa-input[disabled="true"]')
      .find(
        'div[class="goa-input goa-input--disabled variant--goa type--text"]'
      )
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should("have.css", "box-sizing", properties["box-sizing"]);
    // font-size
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    // line-height
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    // border-color
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    // border-radius
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should(
        "have.css",
        "border-radius",
        properties["input-border-radius-0px"]
      );
    // box-shadow
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should("have.css", "box-shadow", "none");
    cy.get('goa-input[disabled="true"]')
      .find('input[class="input--goa"]')
      .should("be.disabled");
  }
);

function remToPx(rem) {
  return rem.replace("rem", "") * 16 + "px";
}

//function to convery hex to rgb
// return rgb(r, g, b)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? "rgb(" +
        parseInt(result[1], 16) +
        ", " +
        parseInt(result[2], 16) +
        ", " +
        parseInt(result[3], 16) +
        ")"
    : null;
}
