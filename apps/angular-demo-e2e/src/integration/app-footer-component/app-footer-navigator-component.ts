import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { linkSync } from "fs";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs I navigate to App Footer section$/, function () {
  cy.get("[label='AppFooter']").click();
});

Then(
  /^cs it should validate the css properties of navigator app footer with title$/,
  function () {
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.footer.navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should(
        "have.css",
        "column-count",
        properties["footer-navigator-column-count"]
      );
    cy.get('goa-app-footer[id="navigation-only"]')
      .find('div[class="navigation-section-name-less"]')
      .should(
        "have.css",
        "column-gap",
        remToPx(properties["footer-navigator-column-gap"])
      );
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  }
);

Then(
  /^cs it should validate the css properties of navigator app footer multi section with title$/,
  function () {
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .should(
        "have.css",
        "padding-top",
        remToPx(properties["footer-multi-section-padding-top"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "column-count", "auto");
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find('div[class="navigation-section-links"]')
      .should("have.css", "column-gap", "normal");
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation-only-multisection"]')
      .find("div.footer.navigation-sections-only-footer")
      .find("section")
      .should(
        "have.css",
        "flex-grow",
        properties["footer-navigator-multi-flex-grow"]
      );
  }
);

Then(
  /^cs it should validate the css properties of navigator app footer multi section with multicolumn section$/,
  function () {
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .should(
        "have.css",
        "padding-top",
        remToPx(properties["footer-multi-section-padding-top"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "column-count", "auto");
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should(
        "have.css",
        "column-gap",
        remToPx(properties["footer-navigator-column-gap"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find('div[class="navigation-links"]')
      .should(
        "have.css",
        "padding-top",
        remToPx(properties["footer-multi-section-padding-top"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find("section")
      .should(
        "have.css",
        "flex-grow",
        properties["footer-navigator-multi-social-column-flex-grow"]
      );
    cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]')
      .find("div.footer.navigation-sections-only-footer")
      .find('section[class="multi-section-column"]')
      .should(
        "have.css",
        "flex-grow",
        properties["footer-navigator-multi-allservice-column-flex-grow"]
      );
  }
);

Then(
  /^cs it should validate the css properties of navigator app footer multi section with links to meta information$/,
  function () {
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .should(
        "have.css",
        "padding-top",
        remToPx(properties["footer-multi-section-padding-top"])
      );
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.footer.meta-and-navigation-links-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should(
        "have.css",
        "column-count",
        properties["footer-navigator-column-count"]
      );
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="navigation-section-name-less"]')
      .should(
        "have.css",
        "column-gap",
        remToPx(properties["footer-navigator-column-gap"])
      );
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="navigation and meta"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
  }
);

Then(
  /^cs it should validate the css properties of navigator app footer multi section and links to meta info$/,
  function () {
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .should("have.css", "max-width", remToPx(properties["footer-max-width"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .should(
        "have.css",
        "padding-top",
        remToPx(properties["footer-multi-section-padding-top"])
      );
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find('img[class="logo"]')
      .should("be.visible");
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should(
        "have.css",
        "color",
        hexToRgb(properties["goa-color-text-secondary"])
      );
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find('a[class="goa-copyright"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should("have.css", "column-count", "auto");
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="navigation-links"]')
      .should(
        "have.css",
        "column-gap",
        remToPx(properties["footer-navigator-column-gap"])
      );
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.brand")
      .should("have.css", "height", remToPx(properties["lh-sm"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.brand")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.brand")
      .should(
        "have.css",
        "background-color",
        hexToRgb(properties["goa-color-brand"])
      );
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.brand")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.brand")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find("div.footer.meta-and-navigation-sections-only-footer")
      .find("section")
      .should(
        "have.css",
        "flex-grow",
        properties["footer-navigator-multi-flex-grow"]
      );
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-app-footer[id="meta-and-navigation-multisection"]')
      .find('div[class="meta-links-logo-and-copyright"]')
      .find("div.meta-links")
      .should("have.css", "line-height", remToPx(properties["lh-base"]));
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
