import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Text Area component$/, function () {
  cy.get("[label=TextArea]").click();
});

Then(
  /^cs I should be able to validate css properties of a basic TextArea$/,
  function () {
    cy.get('goa-textarea[name="comment"]').should("be.visible");
    //cy.get('goa-textarea[name="comment"]').focus()
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "border")
      .should("contain", hexToRgb(properties["color-gray-600"]));
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "background")
      .should("contain", hexToRgb(properties["goa-color-text-light"]));
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "color", hexToRgb(properties["goa-color-text"]));
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "padding", remToPx(properties["input-padding"]));
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "font-size", remToPx(properties["input-font-size"]));
    cy.get('goa-textarea[name="comment"]')
      .find("textarea")
      .should("have.css", "font-family", properties["font-family"]);
    // cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "width", "60ch")
  }
);
Then(
  /^cs I should be able to validate css properties of a inFocus TextArea$/,
  function () {
    cy.get('goa-textarea[name="comment-basic"]').find("textarea").focus();
    cy.get('goa-textarea[name="comment-basic"]')
      .find(".goa-textarea")
      .should("have.css", "box-shadow")
      .should("contain", hexToRgb(properties["goa-color-interactivefocus"]));
    //.and("have.css", "border-color", hexToRgb(properties["goa-color-interactivehover"]));
  }
);
Then(
  /^cs I should be able to validate css properties of a Disabled TextArea$/,
  function () {
    cy.get('goa-textarea[name="comment-disabled"]')
      .find("textarea")
      .should("be.visible");
    cy.get('goa-textarea[name="comment-disabled"]')
      .find("textarea")
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["color-gray-200"])
      );
  }
);
Then(
  /^cs I should be able to validate css properties of a ErrorSate TextArea$/,
  function () {
    cy.get('goa-textarea[name="comment"]')
      .find('textarea[class="goa-textarea error"]')
      .eq(0)
      .should("be.visible");
    cy.get('goa-textarea[name="comment"]')
      .find('textarea[class="goa-textarea error"]')
      .should(
        "have.css",
        "border-color",
        hexToRgb(properties["goa-color-interactiveerror"])
      );
    cy.get('goa-textarea[name="comment"]')
      .find('textarea[class="goa-textarea error"]')
      .focus();
    cy.get('goa-textarea[name="comment"]')
      .find('textarea[class="goa-textarea error"]')
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
