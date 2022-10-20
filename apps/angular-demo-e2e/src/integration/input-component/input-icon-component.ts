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
  /^cs I should be able to validate leading icons box css property$/,
  function () {
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-600"])
      );
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
    // cy.get('goa-input[leadingicon="finger-print"]').find('div[class="goa-input variant--goa type--text"]').should("have.css", "box-shadow", "0 0 0 1px " + hexToRgb(properties["color-gray-600"]));
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-text-light"])
      );
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-input[leadingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-icon[class="goa-input-leading-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "box-sizing", properties["input-box-sizing"]);
    cy.get('goa-icon[class="goa-input-leading-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-icon[class="goa-input-leading-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-icon[class="goa-input-leading-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-icon[class="goa-input-leading-icon"]')
      .find('div[class="goa-icon"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-text"])
      );
    cy.get('goa-input[leadingicon="finger-print"]').find("input").focus();
    cy.get('goa-input[leadingicon="finger-print"]')
      .find(".goa-input")
      .should(
        "have.css",
        "box-shadow",
        hexToRgb(properties["goa-color-interactivefocus"]) + " 0px 0px 0px 3px"
      );
  }
);

Then(
  /^cs I should be able to validate tailing icons box css property$/,
  function () {
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-600"])
      );
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
    // cy.get('goa-input[trailingicon="finger-print"]').find('div[class="goa-input variant--goa type--text"]').should("have.css", "box-shadow", "0 0 0 1px " + hexToRgb(properties["color-gray-600"]));
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-text-light"])
      );
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-input[trailingicon="finger-print"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-icon[class="goa-input-trailing-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "box-sizing", properties["input-box-sizing"]);
    cy.get('goa-icon[class="goa-input-trailing-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-icon[class="goa-input-trailing-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-icon[class="goa-input-trailing-icon"]')
      .find('div[class="goa-icon"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-icon[class="goa-input-trailing-icon"]')
      .find('div[class="goa-icon"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-text"])
      );
    cy.get("abgov-input-component > :nth-child(5)").find("input").focus();
    cy.get("abgov-input-component > :nth-child(5)")
      .find(".goa-input")
      .should(
        "have.css",
        "box-shadow",
        hexToRgb(properties["goa-color-interactivefocus"]) + " 0px 0px 0px 3px"
      );
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
