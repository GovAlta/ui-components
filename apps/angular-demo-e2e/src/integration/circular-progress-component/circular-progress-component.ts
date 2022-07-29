import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to circular progress Type component$/, function () {
  cy.get('[path="/circular-progress"]').click();
});

Then(/^cs I should be able to validate size small circular component css property$/, function () {
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "stroke", hexToRgb(properties["goa-color-brand-light"]));
  cy.get('goa-circular-progress[size="small"]').find('path').should("have.css", "stroke", hexToRgb(properties["goa-color-primary"]));
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "cx", "32px");
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "cy", "32px");
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "stroke-width", "7px");
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "r", "28.5px");

});
Then(/^cs I should be able to validate size large circular component css property$/, function () {
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "stroke", hexToRgb(properties["goa-color-brand-light"]));
  cy.get('goa-circular-progress[size="large"]').find('path').should("have.css", "stroke", hexToRgb(properties["goa-color-primary"]));
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "cx", "50px");
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "cy", "50px");
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "stroke-width", "9px");
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "r", "45.5px");

});

Then(/^cs I should be able to validate size small circular component with message css property$/, function () {
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "stroke", hexToRgb(properties["goa-color-brand-light"]));
  cy.get('goa-circular-progress[size="small"]').find('path').should("have.css", "stroke", hexToRgb(properties["goa-color-primary"]));
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "cx", "32px");
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "cy", "32px");
  cy.get('goa-circular-progress[size="small"]').find('circle').should("have.css", "stroke-width", "7px");
  cy.get('goa-circular-progress[size="small"]').find('.message').should("have.css", "font-family", (properties["font-family"]));
  cy.get('goa-circular-progress[size="small"]').find('.message').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-circular-progress[size="small"]').find('.message').should("have.css", "color", hexToRgb(properties["goa-color-text"]));

});
Then(/^cs I should be able to validate size large circular component with message css property$/, function () {
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "stroke", hexToRgb(properties["goa-color-brand-light"]));
  cy.get('goa-circular-progress[size="large"]').find('path').should("have.css", "stroke", hexToRgb(properties["goa-color-primary"]));
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "cx", "50px");
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "cy", "50px");
  cy.get('goa-circular-progress[size="large"]').find('circle').should("have.css", "stroke-width", "9px");
  cy.get('goa-circular-progress[size="large"]').find('.message').should("have.css", "font-family", (properties["font-family"]));
  cy.get('goa-circular-progress[size="large"]').find('.message').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-circular-progress[size="large"]').find('.message').should("have.css", "color", hexToRgb(properties["goa-color-text"]));

});

// Then(/^cs I should be able to validate disabled checkbox css property$/, function () {
//   cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "border");
//   cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').find('div.goa-checkbox-container').should("have.css", "border", "1px solid " + hexToRgb(properties["color-gray-400"]));
//   // cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "box-sizing", properties["box-sizing"]);
//   cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
//   cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
//   cy.get('goa-checkbox[name="desserts"]').find('label[class="goa-checkbox goa-checkbox--disabled"]').should("have.css", "font-family", properties["font-family"]);
// });

// Then(/^cs I should be able to validate error checkbox css property$/, function () {
//   cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "border");
//   // cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "border", "1px solid " + hexToRgb(properties["goa-color-status-emergency"]));
//   // cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "box-sizing", properties["box-sizing"]);
//   cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
//   cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "font-size", remToPx(properties["fs-base"]));
//   cy.get('goa-checkbox[name="desserts"]').find('label.goa-checkbox.goa-checkbox--error').should("have.css", "font-family", properties["font-family"]);
// });