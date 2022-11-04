Feature: Input
  Scenario: input-component
    Given cs I am a user of GOA application
    When cs Navigating to Basic component
    Then cs I should be able to validate basic box css property

  Scenario: input-icon-component
    Given cs I am a user of GOA application
    When cs Navigating to Basic component
    Then cs I should be able to validate leading icons box css property
    Then cs I should be able to validate tailing icons box css property

  Scenario: input-disable-component
    Given cs I am a user of GOA application
    When cs Navigating to Basic component
    Then cs I should be able to validate disabled icons box css property

  Scenario: input-error-infocus-component
    Given cs I am a user of GOA application
    When cs Navigating to Basic component
    Then cs I should be able to validate error state box css property
    Then cs I should be able to validate css properties of a inFocus TextArea

  Scenario: input-character-count-component
    Given cs I am a user of GOA application
    When cs Navigating to Basic component
    Then cs I should be able to validate css properties of a character count TextArea
    Then cs I should be able to validate css properties of a maxcharacter count TextArea
