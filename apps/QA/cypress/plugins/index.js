/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
import { createHtmlReport } from "axe-html-reporter";
import { axeHtmlReporterOptions } from "../support/axe-html-report-utils";
const cucumber = require('cypress-cucumber-preprocessor').default
const browserify = require("@cypress/browserify-preprocessor");
const sqlServer = require('cypress-sql-server');
const dbconfig = require('../../cypress.json')

module.exports = (on, config) => {
  const options = browserify.defaultOptions;
  options.browserifyOptions.plugin.unshift(['tsify']);
  on('file:preprocessor', cucumber(options))
  let tasks
  tasks = sqlServer.loadDBPlugin(dbconfig.db);
  on('task', tasks, {

    getClipboard() {
      return clipboardy.readSync();
    },

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

}