Feature: DropDown
  Scenario: DropDown-Component
    Given cs I am a user of GOA application
    When cs Navigating to dropdown component
    Then cs I should be able to validate dropdown button css property
    Then cs I should be able to validate dropdown menu css property
  Scenario: DropDown-Error-Component
    Given cs I am a user of GOA application
    When cs Navigating to dropdown error component
    Then cs I should be able to validate dropdown error button css property
    Then cs I should be able to validate dropdown error menu css property