describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      username: 'erikpeteri',
      name: 'Erik Peteri',
      password: 'kilipukki'
    }

    const user2 = {
      username: 'anotheruser',
      name: 'Another User',
      password: 'anotherpassword'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user1) 
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('erikpeteri')
      cy.get('#password').type('kilipukki')
      cy.get('#login-button').click()
  
      cy.contains('Erik Peteri logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('erikpeteri')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Erik Peteri logged in')
    })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('erikpeteri')
      cy.get('#password').type('kilipukki')
      cy.get('#login-button').click()
    })
    
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })
      cy.contains('Test Blog Test Author')
      cy.get('.success').contains('a new blog Test Blog by Test Author added')
      })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      })

    it('A user who added a blog can delete it', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })

      cy.contains('view').click()

      cy.contains('remove').click()

      cy.reload()

      cy.get('html').should('not.contain', 'Test Blog Test Author')
      })
    it('Only the user who added a blog can see the delete button', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })

      cy.contains('logout').click()
      cy.reload()

      cy.get('#username').type('anotheruser')
      cy.get('#password').type('anotherpassword')
      cy.get('#login-button').click()
      cy.get('html').should('not.contain', 'Test Blog Test Author')

      cy.contains('logout').click()
      cy.reload()

      cy.get('#username').type('erikpeteri')
      cy.get('#password').type('kilipukki')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('remove')
      }) 
    
    it('Blogs are arranged in the order according to the likes, the blog with the most likes first', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('Test Author1')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })

      cy.contains('create new blog').click()
      cy.get('#title').type('The title with the most likes')
      cy.get('#author').type('Test Author2')
      cy.get('#url').type('example.com')
      cy.get('button[type="submit"]').click({ force: true })

      cy.contains('view').click()
      cy.wait(1000)
      cy.get('.blog').eq(0).contains('like').click()
      cy.wait(1000)
      cy.get('.blog').eq(0).contains('like').click()
      cy.wait(1000)
      cy.contains('hide').click()

      cy.get('.blog').eq(1).contains('view').click()
      cy.wait(500)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.reload()

      cy.get('.blog').eq(0).contains('The title with the most likes Test Author2')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes Test Author1')
      })
    })
  })
})

