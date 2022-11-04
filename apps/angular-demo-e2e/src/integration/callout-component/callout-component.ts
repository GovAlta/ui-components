import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to CallOut component$/, function () {
  cy.get("[label='Callout']").click();
});

Then(
  /^cs I should be able to validate callout emergency css property$/,
  function () {
    cy.get('goa-callout[type="emergency"]')
      .find("span.icon.emergency")
      .should("be.visible");
    cy.get('goa-callout[type="emergency"]')
      .find("span.icon.emergency")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-status-emergency"])
      );
    // cy.get('goa-callout[type="emergency"]').find('span.icon.emergency').find('div.goa-icon.inverted').should("have.css", "background", hexToRgb(properties["goa-callout-emergency-icon--color"]));
    // cy.get('goa-callout[type="emergency"]').find('span.icon.emergency').find('div.goa-icon.inverted').should("have.css", "opacity", properties["goa-callout-emergency-icon--opacity"]);
    cy.get('goa-callout[type="emergency"]')
      .find("span.content")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-callout[type="emergency"]')
      .find("span.content")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-callout[type="emergency"]')
      .find("span.content")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-callout[type="emergency"]')
      .find("span.content")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["color-gray-100"])
      );
  }
);

Then(
  /^cs I should be able to validate callout Important css property$/,
  function () {
    cy.get('goa-callout[type="important"]')
      .find("span.icon.important")
      .should("be.visible");
    cy.get('goa-callout[type="important"]')
      .find("span.icon.important")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-status-warning"])
      );
    // cy.get('goa-callout[type="important"]').find('span.icon.important').find('div.goa-icon').should("have.css", "color", hexToRgb(properties["goa-callout-important-icon--color"]));
    // cy.get('goa-callout[type="important"]').find('span.icon.important').find('div.goa-icon').should("have.css", "opacity", properties["goa-callout-important-icon--opacity"]);
    cy.get('goa-callout[type="important"]')
      .find("span.content")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-callout[type="important"]')
      .find("span.content")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-callout[type="important"]')
      .find("span.content")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-callout[type="important"]')
      .find("span.content")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["color-gray-100"])
      );
  }
);

Then(
  /^cs I should be able to validate callout information css property$/,
  function () {
    cy.get('goa-callout[type="information"]')
      .find("span.icon.information")
      .should("be.visible");
    cy.get('goa-callout[type="information"]')
      .find("span.icon.information")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-status-info"])
      );
    // cy.get('goa-callout[type="information"]').find('span.icon.information').find('div.goa-icon').should("have.css", "color", hexToRgb(properties["goa-callout-information-icon--color"]));
    // cy.get('goa-callout[type="information"]').find('span.icon.information').find('div.goa-icon').should("have.css", "opacity", properties["goa-callout-information-icon--opacity"]);
    cy.get('goa-callout[type="information"]')
      .find("span.content")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-callout[type="information"]')
      .find("span.content")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-callout[type="information"]')
      .find("span.content")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-callout[type="information"]')
      .find("span.content")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["color-gray-100"])
      );
  }
);

Then(
  /^cs I should be able to validate callout success css property$/,
  function () {
    cy.get('goa-callout[type="success"]')
      .find("span.icon.success")
      .should("be.visible");
    cy.get('goa-callout[type="success"]')
      .find("span.icon.success")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-status-success"])
      );
    // cy.get('goa-callout[type="success"]').find('span.icon.success').find('div.goa-icon').should("have.css", "color", hexToRgb(properties["goa-callout-success-icon--color"]));
    // cy.get('goa-callout[type="success"]').find('span.icon.success').find('div.goa-icon').should("have.css", "opacity", properties["goa-callout-success-icon--opacity"]);
    cy.get('goa-callout[type="success"]')
      .find("span.content")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-callout[type="success"]')
      .find("span.content")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-callout[type="success"]')
      .find("span.content")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-callout[type="success"]')
      .find("span.content")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["color-gray-100"])
      );
  }
);

Then(
  /^cs I should be able to validate callout event css property$/,
  function () {
    cy.get('goa-callout[type="event"]')
      .find("span.icon.event")
      .should("be.visible");
    cy.get('goa-callout[type="event"]')
      .find("span.icon.event")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-status-info"])
      );
    // cy.get('goa-callout[type="event"]').find('span.icon.event').find('div.goa-icon').should("have.css", "color", hexToRgb(properties["goa-callout-event-icon--color"]));
    // cy.get('goa-callout[type="event"]').find('span.icon.event').find('div.goa-icon').should("have.css", "opacity", properties["goa-callout-event-icon--opacity"]);
    cy.get('goa-callout[type="event"]')
      .find("span.content")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-callout[type="event"]')
      .find("span.content")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-callout[type="event"]')
      .find("span.content")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-callout[type="event"]')
      .find("span.content")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["color-gray-100"])
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
