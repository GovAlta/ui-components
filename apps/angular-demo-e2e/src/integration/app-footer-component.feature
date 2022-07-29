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

  Scenario: app-footer-navigator-component
    Given cs I am a user of GOA application
    When cs I navigate to App Footer section
    Then cs it should validate the css properties of navigator app footer with title
    Then cs it should validate the css properties of navigator app footer multi section with title
    Then cs it should validate the css properties of navigator app footer multi section with multicolumn section
    Then cs it should validate the css properties of navigator app footer multi section with links to meta information
    Then cs it should validate the css properties of navigator app footer multi section and links to meta info