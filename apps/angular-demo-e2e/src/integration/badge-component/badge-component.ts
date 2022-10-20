import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Badge component$/, function () {
  cy.get("[label='Badge']").click();
});

Then(
  /^cs I should be able to validate Warning Badge css property$/,
  function () {
    cy.get("div.goa-badge.badge-warning").should("be.visible");
    cy.get("div.goa-badge.badge-warning").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-warning"])
    );
    cy.get("div.goa-badge.badge-warning").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text"])
    );
    cy.get("div.goa-badge.badge-warning.icon-only").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-warning"])
    );
    cy.get("div.goa-badge.badge-warning.icon-only").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text"])
    );
  }
);

Then(
  /^cs I should be able to validate Success Badge css property$/,
  function () {
    cy.get("div.goa-badge.badge-success").should("be.visible");
    cy.get("div.goa-badge.badge-success").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-success"])
    );
    cy.get("div.goa-badge.badge-success").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
    cy.get("div.goa-badge.badge-success.icon-only").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-success"])
    );
    cy.get("div.goa-badge.badge-success.icon-only").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
  }
);

Then(
  /^cs I should be able to validate Information Badge css property$/,
  function () {
    cy.get("div.goa-badge.badge-information").should("be.visible");
    cy.get("div.goa-badge.badge-information").should(
      "have.css",
      "background-color",
      hexToRgb(properties["color-gray-100"])
    );
    cy.get("div.goa-badge.badge-information").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-status-info"])
    );
    cy.get("div.goa-badge.badge-information.icon-only").should(
      "have.css",
      "background-color",
      hexToRgb(properties["color-gray-100"])
    );
    cy.get("div.goa-badge.badge-information.icon-only").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-status-info"])
    );
    // cy.get('div[class="goa-badge badge-information"]').should("have.css", "font-family", hexToRgb(properties["font-family"]));
    // cy.get('div[class="goa-badge badge-information"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  }
);

Then(
  /^cs I should be able to validate Emergency Badge css property$/,
  function () {
    cy.get("div.goa-badge.badge-emergency").should("be.visible");
    cy.get("div.goa-badge.badge-emergency").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-emergency"])
    );
    cy.get("div.goa-badge.badge-emergency").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
    cy.get("div.goa-badge.badge-emergency.icon-only").should(
      "have.css",
      "background-color",
      hexToRgb(properties["goa-color-status-emergency"])
    );
    cy.get("div.goa-badge.badge-emergency.icon-only").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
  }
);

Then(/^cs I should be able to validate Dark Badge css property$/, function () {
  cy.get("div.goa-badge.badge-dark").should("be.visible");
  cy.get("div.goa-badge.badge-dark").should(
    "have.css",
    "background-color",
    hexToRgb(properties["goa-color-text"])
  );
  cy.get("div.goa-badge.badge-dark").should(
    "have.css",
    "color",
    hexToRgb(properties["goa-color-text-light"])
  );
  cy.get("div.goa-badge.badge-dark.icon-only").should(
    "have.css",
    "background-color",
    hexToRgb(properties["goa-color-text"])
  );
  cy.get("div.goa-badge.badge-dark.icon-only").should(
    "have.css",
    "color",
    hexToRgb(properties["goa-color-text-light"])
  );
});

Then(
  /^cs I should be able to validate Midtone Badge css property$/,
  function () {
    cy.get("div.goa-badge.badge-midtone").should("be.visible");
    cy.get("div.goa-badge.badge-midtone").should(
      "have.css",
      "background-color",
      hexToRgb(properties["color-gray-600"])
    );
    cy.get("div.goa-badge.badge-midtone").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
    cy.get("div.goa-badge.badge-midtone.icon-only").should(
      "have.css",
      "background-color",
      hexToRgb(properties["color-gray-600"])
    );
    cy.get("div.goa-badge.badge-midtone.icon-only").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text-light"])
    );
  }
);

Then(/^cs I should be able to validate Light Badge css property$/, function () {
  cy.get("div.goa-badge.badge-light").should("be.visible");
  cy.get("div.goa-badge.badge-light").should(
    "have.css",
    "background-color",
    hexToRgb(properties["goa-color-text-light"])
  );
  cy.get("div.goa-badge.badge-light").should(
    "have.css",
    "color",
    hexToRgb(properties["goa-color-text"])
  );
  cy.get("div.goa-badge.badge-light.icon-only").should(
    "have.css",
    "background-color",
    hexToRgb(properties["goa-color-text-light"])
  );
  cy.get("div.goa-badge.badge-light.icon-only").should(
    "have.css",
    "color",
    hexToRgb(properties["goa-color-text"])
  );
});

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
