describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'erikpeteri',
      name: 'Erik Peteri',
      password: 'kilipukki'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  /*it('user can login', function () {
    cy.contains('Log in to application')
    cy.get('#username').type('erikpeteri')
    cy.get('#password').type('kilipukki')
    cy.get('#login-button').click()

    cy.contains('Erik Peteri logged in')
  })*/

  /*describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('erikpeteri')
      cy.get('#password').type('kilipukki')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('example.com')
      cy.contains('create').click({force: true})
      cy.contains('Test Blog Test Author')
    })
  })*/
})

