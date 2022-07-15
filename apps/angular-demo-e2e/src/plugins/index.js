/// <reference types="cypress" />
import { createHtmlReport } from "axe-html-reporter";
import { axeHtmlReporterOptions } from "../support/axe-html-report-utils";

const cucumber = require('cypress-cucumber-preprocessor').default;
const browserify = require('@cypress/browserify-preprocessor');
const resolve = require('resolve');

module.exports = (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };
  options.browserifyOptions.plugin.unshift(['tsify']);
  on('file:preprocessor', cucumber(options))
  on('task',
    {

      // logs message to console
      log(message) {
        console.log(message)
        return null
      },
      // logs message as table to console
      table(message) {
        console.table(message)
        return null
      },
      // must be created as a task since it required the fs lib which is not accessible via the browser
      htmlReport(violations) {
        // console.log(`***** axeHtmlReporterOptions.reportFileName: ${axeHtmlReporterOptions.reportFileName}`);
        createHtmlReport({ results: { violations: violations }, options: axeHtmlReporterOptions });
        return null;
      }
    })
};