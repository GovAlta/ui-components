/// <reference types="cypress" />
import {
  Before,
  After,
  Given,
  When,
  Then,
} from "cypress-cucumber-preprocessor/steps";

Given(/^cs we want a simple pass$/, function () {
  expect(1).to.eq(1);
});

When(/^cs we are testing cicd$/, function () {
  expect(1).to.eq(1);
});

Then(/^cs it should pass$/, function () {
  expect(1).to.eq(1);
});
