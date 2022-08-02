Feature: AppFooter
  Scenario: app-footer-component
    Given cs I am a user of GOA application
    When cs I navigate to App Footer section
    Then cs I should validate the css properties of Default app footer
    Then cs I should validate the css properties of meta-only app footer
    Then cs I should validate the css properties of navigation-only app footer
    Then cs I should validate the css properties of navigation-multisection app footer
    Then cs I should validate the css properties of navigation-multicolumn app footer
    Then cs I should validate the css properties of navigation-meta app footer
    Then cs I should validate the css properties of navigation-meta app footer