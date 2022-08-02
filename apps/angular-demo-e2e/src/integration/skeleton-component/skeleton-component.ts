import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import properties from "../../fixtures/properties.json";
import { remToPx, hexToRgb } from '../../support/utils'

Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
});

When(/^cs Navigating to Skeleton basic component$/, function () {
  cy.get('[path="/skeleton"]').click();
});

Then(/^cs I should be able to validate css properties of text skeleton$/, function () {
  //cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "width","100%");
  cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "height", remToPx(properties['fs-xs']));
  cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "border-radius",remToPx(properties['border-radius-base']));
  cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "background-color",hexToRgb(properties['color-gray-100']));
  cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="text"]').find(".skeleton.text.text-1").should("have.css", "margin", "10px 0");

});
Then(/^cs I should be able to validate css properties of paragraph skeleton$/, function () {
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "width","100%");
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "height", "70px");
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "border-radius","4px");
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "background-color",hexToRgb(properties['border-radius']));
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="paragraph"]').find(".skeleton.paragraph.paragraph-1").should("have.css", "margin", "10px 0");

});
Then(/^cs I should be able to validate css properties of text-small skeleton$/, function () {
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "width","30%");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "height", "6px");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "border-radius","2px");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "background-color",hexToRgb(properties['border-radius']));
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-1").should("have.css", "margin", "10px 0");

  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-2").should("have.css", "width","40%");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-2").should("have.css", "height", "8px");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-2").should("have.css", "border-radius","2px");

  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-3").should("have.css", "width","50%");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-3").should("have.css", "height", "10px");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton.text-small.text-small-3").should("have.css", "border-radius","3px");

  cy.get('goa-skeleton[type="text-small"]').find(".skeleton text-small.text-small-4").should("have.css", "width","70%");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton text-small.text-small-4").should("have.css", "height", "12px");
  cy.get('goa-skeleton[type="text-small"]').find(".skeleton text-small.text-small-4").should("have.css", "border-radius","4px");

});
Then(/^cs I should be able to validate css properties of cards skeleton$/, function () {
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "flex","1 1 100px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "height", "100px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "border-radius","2px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "background-color",hexToRgb(properties['color-gray-100']));
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-1").should("have.css", "margin", "0");
  //skeleton.header.header-1
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-1").should("have.css", "width", "50%");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-1").should("have.css", "height", "18px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-1").should("have.css", "margin-bottom", "12px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-1").should("have.css", "border-radius", remToPx(properties['border-radius']));

  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-2").should("have.css", "height", "140px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-2").should("have.css", "width", "60%");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-2").should("have.css", "height", "20px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-2").should("have.css", "margin-bottom", "14px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-2").should("have.css", "border-radius", remToPx(properties['border-radius']));

  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-3").should("have.css", "height", "200px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-3").should("have.css", "width", "70%");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-3").should("have.css", "height", "22px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-3").should("have.css", "margin-bottom", "16px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-3").should("have.css", "border-radius", remToPx(properties['border-radius']));

  cy.get('goa-skeleton[type="card"]').find(".skeleton.image.image-4").should("have.css", "height", "300px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-4").should("have.css", "width", "80px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-4").should("have.css", "height", "24px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-4").should("have.css", "margin-bottom", "18px");
  cy.get('goa-skeleton[type="card"]').find(".skeleton.header.header-4").should("have.css", "border-radius", "0.3rem");
});

Then(/^cs I should be able to validate css properties of.avatar skeleton$/, function () {
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "width","40px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "height", "40px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "border-radius","50%");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "background-color",remToPx(properties['border-radius']));
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-1").should("have.css", "margin", "10px 0");
  //2
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-2").should("have.css", "width","60px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-2").should("have.css", "height", "60px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-2").should("have.css", "border-radius","50%");
  //3
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-3").should("have.css", "width","80px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-3").should("have.css", "height", "80px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-3").should("have.css", "border-radius","50%");
  //4
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-4").should("have.css", "width","120px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-4").should("have.css", "height", "120px");
  cy.get('goa-skeleton[type="avatar"]').find(".skeleton.avatar.avatar-4").should("have.css", "border-radius","50%");

});
Then(/^cs I should be able to validate css properties of.header skeleton$/, function () {
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "width","50%");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "height", "18px");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "margin-bottom","12px");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "border-radius",remToPx(properties['color-gray-100']));
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "background-color",hexToRgb(properties['color-gray-100']));
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-1").should("have.css", "margin", "10px 0");
  //2
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-2").should("have.css", "width","60%");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-2").should("have.css", "height", "20px");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-2").should("have.css", "margin-bottom","14px");
  //3
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-3").should("have.css", "width","70%");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-3").should("have.css", "height", "22px");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-3").should("have.css", "margin-bottom","16px");

  //4
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-4").should("have.css", "width","80%");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-4").should("have.css", "height", "24px");
  cy.get('goa-skeleton[type="header"]').find(".skeleton.header.header-4").should("have.css", "margin-bottom","18px");

});
Then(/^cs I should be able to validate css properties of.thumbnails skeleton$/, function () {
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "width","40px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "height", "40px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "border-radius","4px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "background-color",hexToRgb(properties['border-radius']));
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "animation","pulse 2s infinite ease-in-out");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-1").should("have.css", "margin", "10px 0");
  //2
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-2").should("have.css", "width","60px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-2").should("have.css", "height", "60px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-2").should("have.css", "border-radius","4px");
  //3
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-3").should("have.css", "width","80px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-3").should("have.css", "height", "80px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-3").should("have.css", "border-radius","4px");
  //4
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-24").should("have.css", "width","120px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-4").should("have.css", "height", "120px");
  cy.get('goa-skeleton[type="thumbnail"]').find(".skeleton.thumbnail.thumbnail-4").should("have.css", "border-radius","4px");

});
