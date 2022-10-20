import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to container component$/, function () {
  cy.get("[label='Container']").click();
});

Then(
  /^cs I should be able to validate Basic container component css property$/,
  function () {
    // header css
    cy.get(".goa-container--primary header").should("be.visible");
    cy.get(".goa-container--primary header").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-brand"])
    );
    cy.get(".goa-container--primary header").should(
      "have.css",
      "border-color",
      hexToRgb(properties["goa-color-brand"])
    );
    cy.get(".goa-container--primary header").should(
      "have.css",
      "color",
      hexToRgb(properties["color-white"])
    );
    // border status
    cy.get("goa-container").find("div.content").should("have.css", "border");
    cy.get("goa-container")
      .find("div.content")
      .should("have.css", "padding", "1.5rem");
    cy.get("goa-container")
      .find("div.content")
      .should(
        "have.css",
        "border-bottom",
        "1px solid " + hexToRgb(properties["color-gray-600"])
      );
    cy.get("goa-container")
      .find("div.content")
      .should(
        "have.css",
        "border-left",
        "1px solid " + hexToRgb(properties["color-gray-600"])
      );
    cy.get("goa-container")
      .find("div.content")
      .should(
        "have.css",
        "border-right",
        "1px solid " + hexToRgb(properties["color-gray-600"])
      );
    cy.get("goa-container")
      .find("div.content")
      .should(
        "have.css",
        "border-bottom-left-radius",
        properties["border-radius"]
      );
    cy.get("goa-container")
      .find("div.content")
      .should(
        "have.css",
        "border-bottom-right-radius",
        hexToRgb(properties["border-radius"])
      );
    // content inside
  }
);
Then(
  /^cs I should be able to validate container with button css property$/,
  function () {
    // header css
    cy.get('goa-container[data-id="accent-bar"]').should("be.visible");
    cy.get('goa-container[data-id="accent-bar"]')
      .find("header")
      .should(
        "have.css",
        "background-color'",
        hexToRgb(properties["color-gray-100"])
      );
    cy.get('goa-container[data-id="accent-bar"]')
      .find(".heading--large")
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-200"])
      );
    cy.get('goa-container[data-id="accent-bar"]')
      .find(".heading--large")
      .should("have.css", "color", hexToRgb(properties["color-black"]));
    cy.get('goa-container[data-id="accent-bar"]')
      .find(".heading--large")
      .should("have.css", "padding", remToPx(properties["fs-xl"]));
    // header text
    cy.get('goa-container[data-id="accent-bar"]')
      .find("h2")
      .should("have.css", "font-size", remToPx(properties["fs-2xl"]));
    cy.get('goa-container[data-id="accent-bar"]')
      .find("h2")
      .should("have.css", "line-height", remToPx(properties["lh-xl"]));
    cy.get('goa-container[data-id="accent-bar"]')
      .find("h2")
      .should("have.css", "font-weight", remToPx(properties["fw-regular"]));
    // border status
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should("have.css", "border")
      .should("contain", "goa-color-interactive");
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should("have.css", "background", hexToRgb(properties["color-white"]));
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-interactive"])
      );
    cy.get('goa-container[data-id="accent-bar"]').find("button").focus();
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-600"])
      );
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should("have.css", "box-shadow", hexToRgb(properties["color-gray-600"]));
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should("have.css", "border-radius", ["0.25rem"]);
    cy.get('goa-container[data-id="accent-bar"]')
      .find("button")
      .should("have.css", "background", hexToRgb(properties["color-gray-100"]));
    // content inside
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
