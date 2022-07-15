import axe from "axe-core"
import _ from "cypress/types/lodash";
import moment from "moment"

//const today = moment();
//const date = new Date();


export const axeHtmlReporterOptions = {
  outputDirPath: "./dist", // output directory base path
  outputDir: "axe-reports", // directory for the report output files
  // reportFileName: `test${new Date().get}.html`
  reportFileName: `accessibilityReport-${moment().format('YYYYMMDD-HHmmss')}.html`,
  //MM-DD-YYYY-HH:mm:ss
  // reportFileName: `accessibilityReport-${moment().unix()}.html`,
  // reportFileName: "accessibilityReport.html", // name of the report file
};

// function to generate the axe-html-report
export function htmlReport(violations, logToConsole = false) {
  if (violations.length > 0) {
    // write the report to filesystem
    cy.task("htmlReport", violations);

    // log report to console
    if (logToConsole) {
      cy.task(
        "log",
        `\nProcessing Acccessibility (Axe)\n${violations.length
        } accessibility violation${violations.length === 1 ? "" : "s"} ${violations.length === 1 ? "was" : "were"
        } detected`
      );
      // pluck specific keys to keep the table readable
      const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.length,
        })
      );

      cy.task("table", violationData);
    }

    cy.log("No Accessibility Violations Found");
  }
}
