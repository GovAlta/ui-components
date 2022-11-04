import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { eq } from "cypress/types/lodash";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to form item component$/, function () {
  cy.get("[label='Form Item']").click();
});

// First name field component
Then(
  /^cs I should be able to Required FirstName label css property$/,
  function () {
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .eq(0)
      .should("be.visible");
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-weight", properties["fw-bold"]);
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-family", properties["font-family"]);

    // input field  properties default
    cy.get('goa-form-item[label="First name"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "border")
      .should("contain", hexToRgb(properties["color-gray-600"]));
    // input field properties hover
    // cy.get('goa-form-item[label="First name"]').find('div[class="goa-input variant--goa type--text"]').eq(0).trigger("mouseover")
    // cy.get('goa-form-item[label="First name"]').find('div[class="goa-input variant--goa type--text"]').should("have.css", "border-color", hexToRgb(properties["goa-color-interactive--hover"]));
    // input field properties hover
    cy.get('goa-form-item[id="fname"]').find("input").click();
    cy.get('goa-form-item[id="fname"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "box-shadow")
      .should("contain", hexToRgb(properties["goa-color-interactivefocus"]));
  }
);
// First name field component
Then(
  /^cs I should be able to Required MiddleName with optional textfield css properties$/,
  function () {
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .eq(0)
      .should("be.visible");
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .should("have.css", "font-weight", properties["fw-bold"]);
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .should("have.css", "font-family", properties["font-family"]);
    // check css properties for optional value
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .contains("optional")
      .should("be.visible");
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .should("have.css", "font-weight", properties["fw-regular"]);
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .should("have.css", "color", hexToRgb(properties["color-gray-600"]));
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .should("have.css", "font-size", remToPx(properties["fs-sm"]));
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .should("have.css", "font-family", properties["font-family"]);
    cy.get('goa-form-item[label="Middle name"]')
      .find("label")
      .find("em")
      .should("have.css", "line-height", remToPx(properties["lh-sm"]));

    // input field  properties default
    cy.get('goa-form-item[label="Middle name"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "border")
      .should("contain", hexToRgb(properties["color-gray-600"]));
    // input field properties hover
    //cy.get('goa-form-item[label="Middle name"]').find('div[class="goa-input variant--goa type--text"]').eq(0).trigger("mouseover")
    //cy.get('goa-form-item[label="Middle name"]').find('div[class="goa-input variant--goa type--text"]').should("have.css", "border-color", hexToRgb(properties["goa-color-interactivehover"]));
    // input field properties hover
    cy.get('goa-form-item[label="Middle name"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .click();
    cy.get('goa-form-item[label="Middle name"]')
      .find('div[class="goa-input variant--goa type--text"]')
      .should("have.css", "box-shadow")
      .should("contain", hexToRgb(properties["goa-color-interactivefocus"]));
  }
);
Then(
  /^cs I should be able to Required FirstName with HelpText textfield css properties$/,
  function () {
    cy.get(".help-msg").eq(0).should("be.visible").contains("Help text");
    cy.get(".help-msg").should(
      "have.css",
      "font-family",
      properties["font-family"]
    );
    cy.get(".help-msg").should(
      "have.css",
      "font-size",
      remToPx(properties["fs-sm"])
    );
    cy.get(".help-msg").should(
      "have.css",
      "color",
      hexToRgb(properties["goa-color-text"])
    );
  }
);
// First name field component
Then(
  /^cs I should be able to Required FirstName error field css property$/,
  function () {
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .eq(0)
      .should("be.visible");
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-weight", properties["fw-bold"]);
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-size", remToPx(properties["fs-base"]));
    cy.get('goa-form-item[label="First name"]')
      .find("label")
      .should("have.css", "font-family", properties["font-family"]);

    // input field  properties default
    cy.get('goa-form-item[label="First name"]')
      .find('div[class="goa-input variant--goa type--text error"]')
      .should("have.css", "border")
      .should("contain", hexToRgb(properties["goa-color-interactiveerror"]));
    // input field properties hover
    //cy.get('goa-form-item[label="First name"]').find('div[class="goa-input variant--goa type--text error"]').eq(0).trigger("mouseover")
    //cy.get('goa-form-item[label="First name"]').find('div[class="goa-input variant--goa type--text error"]').should("have.css", "border-color", hexToRgb(properties["goa-color-interactivehover"]));
    // input field properties hover
    cy.get('goa-form-item[label="First name"]')
      .find('div[class="goa-input variant--goa type--text error"]')
      .eq(0)
      .click();
    cy.get('goa-form-item[label="First name"]')
      .find('div[class="goa-input variant--goa type--text error"]')
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
