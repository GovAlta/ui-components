/// <reference types="cypress" />
import { injectAxe } from '../../../support/app.po';
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { htmlReport } from "../../../support/axe-html-report-utils";


Given(/^cs I am a user of GOA application$/, function () {
  cy.visit("http://localhost:4200/");
  // cy.get("[label='Checkbox']").click();
  cy.get('[label=Button]').click();
  //cy.wait(500);
  injectAxe();

  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: ["critical", "serious"],
      },
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
});

//1. Check all Accessibility Failures on the Page
// cy.checkA11y();

//2. Exclude Specific Accessibility Element on the page
//cy.checkA11y({exclude:['.upload-button']  });

//3. Check only Specific Accessibility Element on the page
//cy.checkA11y('.upload-button');

//4. Disable Accessibility Rules
/* cy.checkA11y(null!, {
    rules: {
      "aria-required-children": { enabled: false },
      "landmark-no-duplicate-banner": { enabled: false },
    },
  }); */
