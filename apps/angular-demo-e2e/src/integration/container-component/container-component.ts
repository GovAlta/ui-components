import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to container component$/, function () {
  cy.get('[path="/container"]').click();
});

Then(/^cs I should be able to validate Basic container component css property$/, function () {
  // header css
  cy.get('.goa-container--primary header').should("be.visible")
  cy.get('.goa-container--primary header').should("have.css", "background-color", hexToRgb(properties["goa-color-brand"]));
  cy.get('.goa-container--primary header').should("have.css", "border-color", hexToRgb(properties["goa-color-brand"]));
  cy.get('.goa-container--primary header').should("have.css", "color", hexToRgb(properties["goa-color-text-light"]));
  // border status
  cy.get('goa-container').find('div.content').should("have.css", "border");
  cy.get('goa-container').find('div.content').should("have.css", "padding", remToPx("1.5rem"));
  cy.get('goa-container').find('div.content').should("have.css", "border-bottom", "1px solid " + hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container').find('div.content').should("have.css", "border-left", "1px solid " + hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container').find('div.content').should("have.css", "border-right", "1px solid " + hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container').find('div.content').should("have.css", "border-bottom-left-radius", remToPx(properties["border-radius"]));
  cy.get('goa-container').find('div.content').should("have.css", "border-bottom-right-radius", remToPx(properties["border-radius"]));
  // content inside

});

Then(/^cs I should be able to validate container with large accent bar$/, function () {
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("be.visible");
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("have.css", "border-width", "1px");
  cy.get('goa-container[headingsize="large"]').find('header[class="heading--large"]').should("have.css", "border-style", "solid");
  // content
  cy.get('goa-container[headingsize="large"]').find('div[class="content"]').should("be.visible");
  cy.get('goa-container[headingsize="large"]').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[headingsize="large"]').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[headingsize="large"]').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container[headingsize="large"]').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "font-weight", "400");
});

Then(/^cs I should be able to validate container with small accent bar$/, function () {
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("be.visible");
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("have.css", "border-width", "1px");
  cy.get('goa-container[headingsize="small"]').find('header[class="heading--small"]').should("have.css", "border-style", "solid");
  // content
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("be.visible");
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[headingsize="small"]').find('div[class="content"]').should("have.css", "font-weight", "400");
});

Then(/^cs I should be able to validate container with accent bar with text$/, function () {
  cy.get('goa-container').find('header[class="heading--large"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-width", "1px");
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-style", "solid");

  // title
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "line-height", remToPx(properties["lh-lg"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-weight", "700");

  // action
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-weight", "700");

  // content
  cy.get('goa-container').find('div[class="content"]').should("be.visible");
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-weight", "400");
  cy.get('goa-container').find('div[class="content"]').should("have.css", "padding", remToPx("1.5rem"));
});

Then(/^cs I should be able to validate container with heading with text only$/, function () {
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("be.visible");
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("have.css", "border-width", "1px");
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').should("have.css", "border-style", "solid");

  // title
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("be.visible");
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "line-height", remToPx(properties["lh-lg"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-weight", "700");

  // action
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("be.visible");
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[title="Heading"]').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-weight", "700");

  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').should("be.visible");
  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').find('div[data-type="goa-badge"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').find('div[data-type="goa-badge"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').find('div[data-type="goa-badge"]').should("have.css", "color", hexToRgb(properties["goa-color-text-light"]));
  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').find('div[data-type="goa-badge"]').should("have.css", "font-weight", "400");
  cy.get('goa-container[title="Heading"]').find('div[slot="actions"]').find('div[data-type="goa-badge"]').should("have.css", "background-color", hexToRgb(properties["goa-color-status-success"]));


  // content
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("be.visible");
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[title="Heading"]').find('div[class="content"]').should("have.css", "font-weight", "400");
});

Then(/^cs I should be able to validate container nested$/, function () {
  cy.get('goa-container').find('header[class="heading--large"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "background-color", hexToRgb(properties["color-gray-100"]));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-color", hexToRgb(properties["color-gray-200"]));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-width", "1px");
  cy.get('goa-container').find('header[class="heading--large"]').should("have.css", "border-style", "solid");

  // title
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "line-height", remToPx(properties["lh-lg"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="title"]').should("have.css", "font-weight", "700");

  // action
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("be.visible");
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('header[class="heading--large"]').find('div[class="actions"]').should("have.css", "font-weight", "700");

  // content
  cy.get('goa-container').find('div[class="content"]').should("be.visible");
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container').find('div[class="content"]').should("have.css", "font-weight", "400");
  cy.get('goa-container').find('div[class="content"]').should("have.css", "padding", remToPx("1.5rem"));

  // nested header
  cy.get('goa-container[variant="primary"]').find('header[class="heading--small"]').should("be.visible");
  cy.get('goa-container[variant="primary"]').find('header[class="heading--small"]').should("have.css", "background-color", hexToRgb(properties["goa-color-brand"]));
  cy.get('goa-container[variant="primary"]').find('header[class="heading--small"]').should("have.css", "padding", "0px " + remToPx("1.5rem"));
  cy.get('goa-container[variant="primary"]').find('header[class="heading--small"]').should("have.css", "border-width", "1px");
  cy.get('goa-container[variant="primary"]').find('header[class="heading--small"]').should("have.css", "border-style", "solid");

  // content nested
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("be.visible");
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("have.css", "font-family", properties["font-family"]);
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("have.css", "font-size", remToPx(properties["fs-base"]));
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("have.css", "line-height", remToPx(properties["lh-base"]));
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("have.css", "color", hexToRgb(properties["goa-color-text"]));
  cy.get('goa-container[variant="primary"]').find('div[class="content"]').should("have.css", "font-weight", "400");
});