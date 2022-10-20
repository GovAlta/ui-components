import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Button Type primary component$/, function () {
  cy.get("[label=Button]").click();
});

Then(
  /^cs I should be able to validate sizes Compact primary button css property$/,
  function () {
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-interactive"])
      );
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .eq(0)
      .rightclick({ force: true })
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-interactiveactive"])
      );
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should("have.css", "border");
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should(
        "have.css",
        "height",
        remToPx(properties["button-height-compact"])
      );
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-light"])
      );
    cy.get('goa-button[type="primary"]')
      .find("button.primary.compact")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
  }
);

Then(
  /^cs I should be able to validate sizes Compact Secondary button css property$/,
  function () {
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should("have.css", "border");
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should(
        "have.css",
        "height",
        remToPx(properties["button-height-compact"])
      );
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-interactive"])
      );
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .eq(0)
      .rightclick({ force: true })
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-interactiveactive"])
      );
    cy.get('goa-button[type="secondary"]')
      .find("button.secondary.compact")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
  }
);

Then(
  /^cs I should be able to validate sizes Compact tertiary button css property$/,
  function () {
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should("have.css", "border");
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should(
        "have.css",
        "border-radius",
        remToPx(properties["border-radius"])
      );
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should(
        "have.css",
        "height",
        remToPx(properties["button-height-compact"])
      );
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-interactive"])
      );
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .eq(0)
      .rightclick({ force: true })
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-100"])
      );
    cy.get('goa-button[type="tertiary"]')
      .find("button.tertiary.compact")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
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
