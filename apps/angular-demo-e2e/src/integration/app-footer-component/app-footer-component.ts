import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs I navigate to App Footer section$/, function () {
  cy.get("[label='AppFooter']").click();
});

Then(
  /^cs it should validate the css properties of app footer with title$/,
  function () {
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="default"]')
      .find("div.footer.default-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="default"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="default"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  }
);

Then(
  /^cs it should validate the css properties of meta app footer with title$/,
  function () {
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.footer.meta-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-only"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
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
