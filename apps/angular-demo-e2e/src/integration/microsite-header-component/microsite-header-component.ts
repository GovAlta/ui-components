import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Microsite header component$/, function () {
  cy.get("[label='Microsite header']").click();
});

Then(/^cs I should be able to validate microsite Alpha header$/, function () {
  cy.get('goa-microsite-header[level="alpha"]').find('header.goa-official-site-header').should("have.css", "background-color",hexToRgb(properties["color-gray-100"]));
  cy.get('goa-microsite-header[level="alpha"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "background-color",hexToRgb(properties["goa-color-status-warning"]));
  cy.get('goa-microsite-header[level="alpha"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
  cy.get('goa-microsite-header[level="alpha"]').find('header.goa-official-site-header').find('div[data-testid="site-text"]').should("have.css", "font-size",remToPx(properties["fs-xs"]));
  cy.get('goa-microsite-header[level="alpha"]').find('header.goa-official-site-header').find('div[data-testid="site-text"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
});
Then(/^cs I should be able to validate microsite Beta header$/, function () {
  cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').should("have.css", "background-color",hexToRgb(properties["color-gray-100"]));
  cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "background-color",hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "color",hexToRgb(properties["goa-color-text-light"]));
  cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').find('div[data-testid="site-text"]').should("have.css", "font-size",remToPx(properties["fs-xs"]));
  cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').find('div[data-testid="site-text"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
  // cy.get('goa-microsite-header[level="beta"]').find('header.goa-official-site-header').find('div[data-testid="version"]').should("have.css", "color",hexToRgb(properties["color-gray-600"]));
});
Then(/^cs I should be able to validate microsite live header$/, function () {
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').should("have.css", "background-color",hexToRgb(properties["color-gray-100"]));
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "background-color",hexToRgb(properties["goa-color-status-warning"]));
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').find('div[data-testid="level"]').should("have.css", "color",hexToRgb(properties["goa-color-text"]));
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').find('svg').should("have.css", "width","26px");
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').find('svg').should("have.css", "height","26px");
  cy.get('goa-microsite-header[level="live"]').find('header.goa-official-site-header').find('.site-text').find('a').click({})
});