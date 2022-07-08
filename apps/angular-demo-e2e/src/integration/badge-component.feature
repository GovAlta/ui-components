Feature: Badge
  Scenario: Badge-component
    Given cs I am a user of GOA application
    When cs Navigating to Badge component
    Then cs I should be able to validate Warning Badge css property
    Then cs I should be able to validate Success Badge css property
    Then cs I should be able to validate Information Badge css property
    Then cs I should be able to validate Emergency Badge css property
    Then cs I should be able to validate Dark Badge css property
    Then cs I should be able to validate Midtone Badge css property
    Then cs I should be able to validate Light Badge css property