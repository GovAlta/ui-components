Feature: CheckBox
  Scenario: checkbox-basic-component
    Given cs I am a user of GOA application
    When cs Navigating to checkbox Type basic component
    Then cs I should be able to validate basic checkbox css property
    Then cs I should be able to validate checked checkbox css property
    Then cs I should be able to validate disabled checkbox css property
    Then cs I should be able to validate error checkbox css property