import '@testing-library/cypress/add-commands'

describe('template spec', () => {
  it('passes', () => {
    // cy.visit('https://xpresssmokeshop.com')
    cy.visit('https://linkedin.com')

    const loginButtonLocator = 'button[text=Sign in]'

    cy.get('body')
      .then($body => {

        if ($body.find('button:contains("Sign in")', { timeout: 1000 }).length == 0)
          cy.log('Sign in button not found. I guess we\'re already logged in!')
        else {
          cy.log('Sign in button exists!')

          cy.get('button').contains('Sign in').click();
          // cy.get('button').contains('Sign in with Google').click();

        }

        // if ($body.find('button').length > 0) {
          
        //   cy.get('button').contains('Sign in').click()

        //   console.log('clicked!')

        // }

        // else {

          // console.log('not clicked!')

        // }
      })
      


    try {
      // const foo = ;
      console.log({ foo })
    }
    catch (err) {
      console.log(`no sign in button on page... I guess we're already signed in!`)
    }


    // if (cy.get('.body').find(loginButtonLocator).length > 0) {

    //   cy.get(loginButtonLocator).click();
    // }
  })
})

