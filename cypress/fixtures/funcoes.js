export function criarUsuario() {

    const timestamp = Date.now()
    const nome = 'Usuário Teste'
    const email = `usuario${timestamp}@teste.com`
    const senha = '123456'

    cy.visit('https://automationexercise.com')

    cy.get('a[href="/login"]').click()

    cy.contains('h2', 'New User Signup!').should('be.visible')

    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)

    cy.get('[data-qa="signup-button"]').click()

    cy.contains('b', 'Enter Account Information').should('be.visible')

    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type(senha, { log: false })
    cy.get('[data-qa="days"]').select('14')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('1985')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type('Danilo')
    cy.get('[data-qa="last_name"]').type('Teste')
    cy.get('[data-qa="company"]').type('Empresa Teste')
    cy.get('[data-qa="address"]').type('Rua Antonio Pirovani, 116')
    cy.get('[data-qa="address2"]').type('Apto 20')
    cy.get('[data-qa="country"]').select('Canada')
    cy.get('[data-qa="state"]').type('Ontario')
    cy.get('[data-qa="city"]').type('Taquaritinga')
    cy.get('[data-qa="zipcode"]').type('15902332')
    cy.get('[data-qa="mobile_number"]').type('+5516992991635')

    cy.get('[data-qa="create-account"]').click()

    cy.contains('b', 'Account Created!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()

    cy.contains('Logged in as').should('contain.text', nome)

    return { nome, email, senha }
}