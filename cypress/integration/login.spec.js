describe('My First Test', function() {
  it('login', function() {
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
      .then((xhr) => {
        assert.isNotNull(xhr.response.body.data, '1st API call has data')
        console.log(xhr)
        console.dir(xhr)
        assert(xhr.response.statusCode, 401)
      })
  })
})
