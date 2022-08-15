Feature: Container
  Scenario: container-component
    Given cs I am a user of GOA application
    When cs Navigating to container component
    Then cs I should be able to validate Basic container component css property
    Then cs I should be able to validate container with large accent bar
    Then cs I should be able to validate container with small accent bar
    Then cs I should be able to validate container with accent bar with text
    Then cs I should be able to validate container with heading with text only
    Then cs I should be able to validate container nested
