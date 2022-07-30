Feature: Accessibility tests

  Scenario: Test accessiblity on application pages
    Given cs I am a user of GOA application
      | critical | serious |
    When I am testing
      | critical | serious |