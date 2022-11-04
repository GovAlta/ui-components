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
  /^cs I should be able to validate error state box css property$/,
  function () {
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should("have.css", "box-sizing", properties["box-sizing"]);
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-interactiveerror"])
      );
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .rightclick()
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-interactiveerror"])
      );
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should("have.css", "box-sizing", properties["box-sizing"]);
    cy.get('[error=""]')
      .find("div.goa-input.variant--goa.type--text.error")
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
  }
);

Then(
  /^cs I should be able to validate css properties of a inFocus TextArea$/,
  function () {
    // cy.get('div[class="goa-input variant--goa type--text"]').find('input').eq(4).focus()
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should("have.css", "box-sizing", properties["box-sizing"]);
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-text"])
      );
    cy.get('div[class="goa-input variant--goa type--text"]')
      .find('input[class="input--goa"]')
      .should(
        "have.css",
        "border-radius",
        properties["input-border-radius-0px"]
      );
    cy.get("abgov-input-component > :nth-child(13)").find("input").focus();
    cy.get("abgov-input-component > :nth-child(13)")
      .find(".goa-input")
      .should("have.css", "box-shadow")
      .should("contain", hexToRgb(properties["goa-color-interactivefocus"]));
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
