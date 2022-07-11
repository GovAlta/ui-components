import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Text Area component$/, function () {
  cy.get('[label=TextArea]').click();
});

Then(/^cs I should be able to validate css properties of a basic TextArea$/, function () {
  cy.get('goa-textarea[name="comment"]').should("be.visible");
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "border", "1px solid " + hexToRgb(properties["color-gray-600"]));
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "background", hexToRgb(properties["goa-color-text-light"]) + " none repeat scroll 0% 0% / auto padding-box border-box");
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "color", hexToRgb(properties["goa-color-text"]))
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "padding", remToPx(properties["input-padding"]))
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "font-size", remToPx(properties["input-font-size"]))
  cy.get('goa-textarea[name="comment"]').find('textarea').should("have.css", "font-family", (properties["font-family"]))
});
Then(/^cs I should be able to validate css properties of a inFocus TextArea$/, function () {
  cy.get('goa-textarea[name="comment"]').find('textarea').eq(0).click({ force: true })
  // cy.get('goa-textarea[name="comment"]').find('goa-textarea').should("have.css", "box-shadow", "0 0 0 3px " + hexToRgb(properties["goa-color-interactive-focus"]));

});
Then(/^cs I should be able to validate css properties of a Disabled TextArea$/, function () {
  cy.get('goa-textarea[name="comment-disabled"]').find('textarea').should("be.visible");
  cy.get('goa-textarea[name="comment-disabled"]').find('textarea').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));

});
Then(/^cs I should be able to validate css properties of a ErrorSate TextArea$/, function () {
  cy.get('goa-textarea[name="comment"]').find('textarea[class="goa-textarea error"]').eq(0).should("be.visible");
  cy.get('goa-textarea[name="comment"]').find('textarea[class="goa-textarea error"]').should("have.css", "border-color", hexToRgb(properties["goa-color-interactiveerror"]));

});

function remToPx(rem) {
  return rem.replace("rem", "") * 16 + "px";
}

//function to convery hex to rgb
// return rgb(r, g, b)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : null;
}
