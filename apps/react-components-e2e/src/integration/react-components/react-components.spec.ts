describe('react-components: ReactComponents component', () => {
  beforeEach(() => cy.visit('/?path=/story/component-library-components-callout--variants'));
    
    it('should render the component', () => {
      cy.contains('Callout Title')
    });
});
