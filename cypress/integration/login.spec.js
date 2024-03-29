describe('Login Suite ::', function() {
  it('Failed Login ::', function() {
    cy.server();
    cy.route({ method: 'POST', url: 'http://api.rtracey.dev.rockloans.com/v1/login' }).as('postLogin');

    cy.visit('http://rtracey.dev.rockloans.com/app#/login');

    cy.get('#email')
      .type('fake@email.com').should('have.value', 'fake@email.com')

    cy.get('#password')
      .type('somepassword').should('have.value', 'somepassword')


    cy.get('#signIn')
      .click()

      cy.wait('@postLogin')     
      .then(xhr => {
        assert.equal(xhr.status, 401)
      })
  })
})
