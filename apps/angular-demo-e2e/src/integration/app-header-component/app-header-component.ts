import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});
When(/^cs I navigate to App Header section$/, function () {
  cy.get("[label='App Header']").click();
});
Then(
  /^cs it should validate the css properties of basic app header$/,
  function () {
    cy.get('div[class="app-header"]')
      .should("have.css", "border-bottom")
      .should("contains", hexToRgb(properties["color-gray-100"]));
    cy.get("img.image-desktop").should("be.visible");
  }
);
Then(
  /^cs it should validate the css properties of app header with title$/,
  function () {
    cy.get('div[class="app-header"]')
      .should("have.css", "border-bottom")
      .should("contains", hexToRgb(properties["color-gray-100"]));
    cy.get("img.image-desktop").should("be.visible");
    cy.get('a[class="app-link"]')
      .find("span")
      .should("have.css", "font-family", properties["font-family"]);
    //cy.get('a[class="app-link"]').find('span').should('have.css', "font-size", properties["fs-base"])
    // cy.get('a[class="app-link"]').find('span').should('have.css', "line-height", properties["lh-base"])
  }
);
Then(
  /^cs it should validate the css properties of custom app header$/,
  function () {
    cy.get('div[class="app-header"]')
      .should("have.css", "border-bottom")
      .should("contain", hexToRgb(properties["color-gray-100"]));
    cy.get("img.image-desktop").should("be.visible");
    cy.get('a[class="app-link"]')
      .find("span")
      .should("have.css", "font-family", properties["font-family"]);
    // cy.get('a[class="app-link"]').find('span').should('have.css', "font-size", remToPx(properties["fs-base"]))
    // cy.get('a[class="app-link"]').find('span').should('have.css', "line-height", remToPx(properties["lh-base"]))
    cy.get("goa-app-header")
      .find('a[title="loginUrl"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-interactive"])
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
