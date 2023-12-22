describe('Navigation', () => {
  it('should navigate to the comedian list', () => {
    // Start from the index page
    cy.visit('/')

    cy.get('a.link[href*="/comedians"]').click()

    // The new url should include "/comedians"
    cy.url().should('include', '/comedians')
 
    cy.get("#search-comedian")
    .type("Dave Chappelle")

    cy.get('li#search-comedian-option-0')
    .click()

    cy.get('h1.name')
    .should('contain', 'Dave Chappelle')

    cy.get('a[href*="/profile"]').click()

    cy.url().should('include', '/profile')
  })
})