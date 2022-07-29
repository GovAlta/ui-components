Feature: Chip
  Scenario: Chip-Component
    Given cs I am a user of GOA application
    When cs Navigating to Basic chip component
    Then cs I should be able to validate basic chip css property
    Then cs I should be able to validat basic chip css property onClick
  Scenario: Chip-Component-Error
    Given cs I am a user of GOA application
    When cs Navigating to Basic chip component
    Then cs I should be able to validate Error state chip css property
    Then cs I should be able to validate Error state chip RightClick css property
