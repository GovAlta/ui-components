import 'cypress-iframe';

describe('Storybook-html', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4400');
    })

    // Tests for button-variants
    describe('button-variants', () => {
        beforeEach(() => {
            // button-variants story
            cy.get('#title').should('exist').as('knob-title').then(() => {
                cy.get('#buttonType').should('exist').as('knob-buttonType').then(() => {
                    cy.get('#explorerdesign-system-basic-elements-buttons-angular--variants').click().then(() => {
                        return cy.frameLoaded('#storybook-preview-iframe').iframe().as('button-iframe').then(() => {
                            cy.get('@button-iframe').find('.goa-button').should('exist').as('button');
                        });
                    });
                })
            });
        });

        describe('Button-primary', () => {
            beforeEach(() => {
                cy.get('@knob-title').clear().type('Primary');
                cy.get('@knob-buttonType').clear().type('primary');
            });

            it('should be clickable', () => {
                cy.get('@button').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button').should('have.class', 'goa-button');
            });

            it('should have text and title Primary', () => {
                cy.get('@button').should('have.text', 'Primary');
            });
        });

        // Tests for button-Secondary  
        describe('Button-secondary', () => {
            beforeEach(() => {
                cy.get('@knob-title').clear().type('Secondary');
                cy.get('@knob-buttonType').clear().type('secondary');
            });

            it('should be clickable', () => {
                cy.get('@button').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button').should('have.class', 'goa-button');
            });

            it('should contain class goa--secondary', () => {
                cy.get('@button').should('have.class', 'goa--secondary');
            });

            it('should have text and title Secondary', () => {
                cy.get('@button').should('have.text', 'Secondary');
            });
        });

        // Tests for button-tertiary  
        describe('Button-tertiary', () => {
            beforeEach(() => {
                cy.get('@knob-title').clear().type('Tertiary');
                cy.get('@knob-buttonType').clear().type('tertiary');
            });

            it('should be clickable', () => {
                cy.get('@button').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button').should('have.class', 'goa-button');
            });

            it('should contain class goa--tertiary', () => {
                cy.get('@button').should('have.class', 'goa--tertiary');
            });

            it('should have text and title Tertiary', () => {
                cy.get('@button').should('have.text', 'Tertiary');
            });
        });
    });      
});
