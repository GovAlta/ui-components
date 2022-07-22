/// <reference types="cypress" />
import { injectAxe } from '../../../support/app.po';
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { htmlReport } from "../../../support/axe-html-report-utils";

Given(/^cs I am a user of GOA application$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.log(`checking for impacts of type: ${impacts}`);
  cy.visit("http://localhost:4200/");
  // cy.get("[label='Checkbox']").click();
  //cy.get('[label=Button]').click();
  cy.wait(2000);
  injectAxe();
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true,
      // (violations) => {
      //   htmlReport(violations, true);
      //}
    )
    cy.wait(2000)
    cy.get('[label=Button]').click();
    // cy.get("[label='Checkbox']").click();
    // cy.get('[label=Button]').click();
    cy.wait(2000);
    cy.get("body").then(function () {
      cy.checkA11y(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        null!,
        {
          // includedImpacts: ["critical", "serious"],
          includedImpacts: impacts,
        },
        logViolationsWithDetail,
        true // don't fail the build when there are accessibility failures, for now. This should be removed later.
      );
    });
  });
});


When('I am testing', function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=TextArea]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
})


function logViolationsWithDetail(violations) {
  violations.forEach((violation) => {
    const nodes = Cypress.$(violation.nodes.map((node) => node.target).join(','));
    Cypress.log({
      name: `${violation.impact.toUpperCase()} A11Y Violation:`,
      consoleProps: () => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`,
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: 'TO BE FIXED:  ',
        consoleProps: () => violation,
        $el: Cypress.$(target.join(',')),
        message: target,
      });
    });
  });
}
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
