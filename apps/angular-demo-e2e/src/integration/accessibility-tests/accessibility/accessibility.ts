/// <reference types="cypress" />
import { injectAxe } from '../../../support/app.po';
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { htmlReport } from "../../../support/axe-html-report-utils";

Given(/^cs I am a user of GOA application$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.log(`checking for impacts of type: ${impacts}`);
  cy.visit("http://localhost:4200/");
  cy.wait(2000);
  injectAxe();
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    )
  });
});

When(/^I click on button$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Button]').click();
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
});

When(/^I click on Checkbox$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Checkbox]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      // logViolationsWithDetail, true
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
});

When(/^I click on Radio$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Radio]').click();
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
});

When(/^I click on DropDown$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Dropdown]').click();
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
});

When(/^I click on Input$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Input]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    );
  });
});

When(/^I click on TextArea$/, function (impactsDataTable) {
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
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    );
  });
})

When(/^I click on Modal$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Modal]').click();
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
});

When(/^I click on AppFooter$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=AppFooter]').click();
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
});

When(/^I click on Badge$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Badge]').click();
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
});

When(/^I click on Callout$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Callout]').click();
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
});

When(/^I click on Chip$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Chip]').click();
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
});

When(/^I click on Circular progress$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label="Circular progress"]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    );
  });
});

// When(/^I click on Hero Banner$/, function (impactsDataTable) {
//   const impacts = impactsDataTable.raw()[0];
//   cy.get('[label="Hero Banner"]').click();
//   cy.wait(2000);
//   cy.get("body").then(function () {
//     cy.checkA11y(
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       null!,
//       {
//         includedImpacts: impacts,
//       },
//       // logViolationsWithDetail, true
//       (violations) => {
//         htmlReport(violations, true);
//       }
//     );
//   });
// });

When(/^I click on App Header$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label="App Header"]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      // logViolationsWithDetail, true
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
});

When(/^I click on Microsite header$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label="Microsite header"]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    );
  });
});

When(/^I click on Container$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Container]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      // logViolationsWithDetail, true
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
});

When(/^I click on Skeleton$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label=Skeleton]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      // logViolationsWithDetail, true
      (violations) => {
        htmlReport(violations, true);
      }
    );
  });
});

When(/^I click on Form Item$/, function (impactsDataTable) {
  const impacts = impactsDataTable.raw()[0];
  cy.get('[label="Form Item"]').click();
  cy.wait(2000);
  cy.get("body").then(function () {
    cy.checkA11y(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      null!,
      {
        includedImpacts: impacts,
      },
      logViolationsWithDetail, true
      // (violations) => {
      //   htmlReport(violations, true);
      // }
    );
  });
});


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