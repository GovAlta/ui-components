import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs I navigate to App Footer section$/, function () {
  cy.get('[path="/app-footer"]').click();
});

Then(/^cs I should validate the css properties of Default app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="default"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
 // cy.get('goa-app-footer[id="default"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should("have.css", "font-weight", "400");
  cy.get('goa-app-footer[id="default"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="default"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="default"]').find('footer').find('img').should("be.visible");
});

Then(/^cs I should validate the css properties of meta-only app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="meta-only"]').find('footer').find('img').should("be.visible");

});

Then(/^cs I should validate the css properties of navigation-only app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="navigation-only"]').find('footer').find('img').should("be.visible");

});
Then(/^cs I should validate the css properties of navigation-multisection app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="navigation-only-multisection"]').find('footer').find('img').should("be.visible");

});
Then(/^cs I should validate the css properties of navigation-multicolumn app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('footer').find('img').should("be.visible");
  // cy.get('goa-app-footer[id="navigation-only-multisection-multicolumn"]').find('goa-app-footer-meta-section').find('a').should("have.length.gte", 4);

});
Then(/^cs I should validate the css properties of navigation-meta app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="navigation and meta"]').find('footer').find('img').should("be.visible");
  // cy.get('goa-app-footer[id="navigation and meta"]').find('goa-app-footer-meta-section').find('a').should("have.length.gte", 4);

});
Then(/^cs I should validate the css properties of meta-navigation-multisection app footer$/, function () {
  // cy.get('goa-app-footer[id="default"]').find('div.footer.default-footer').should("have.css", "max-width", remToPx(properties["footer-max-width"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("be.visible");
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should('have.css', "padding", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should('have.css', "margin-top", remToPx(properties["lh-lg"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should('have.css', "border-top").should("contain", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should('have.css', "border-bottom").should("contain", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should('have.css', "font-family", (properties["font-family"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("have.css", "font-weight", ("400"));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('footer').find('img').should("be.visible");
  // cy.get('goa-app-footer[id="meta-and-navigation-multisection"]').find('goa-app-footer-meta-section').find('a').should("have.length.gte", 4);

});