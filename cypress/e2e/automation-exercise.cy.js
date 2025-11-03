/// <reference types="cypress" />

import { criarUsuario } from '../fixtures/funcoes'

describe('Caso de Teste 1: Registrar Usuário', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {

    const user = criarUsuario()

    cy.get('a[href="/delete_account"]').click()

    cy.contains('b', 'Account Deleted!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()

  })
})

describe('Caso de Teste 2: Login de usuário e senha corretas', () => {
  it('Deve realizar login com sucesso', () => {

    const user = criarUsuario()

    cy.visit('https://automationexercise.com')

    cy.get('a[href="/delete_account"]').click()

    cy.contains('b', 'Account Deleted!').should('be.visible')

  })
})

describe('Caso de Teste 3: Login de usuário/senha incorretos', () => {

  const emailIncorreto = 'teste_sichieri@teste.com'
  const senhaIncorreta = '010101'

  it('Deve realizar login com erro', () => {

    cy.visit('https://automationexercise.com')

    cy.get('a[href="/login"]').click()

    cy.get('[data-qa="login-email"]').type(emailIncorreto)
    cy.get('[data-qa="login-password"]').type(senhaIncorreta, { log: false })

    cy.get('[data-qa="login-button"]').click()

    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
  })
})

describe('Caso de Teste 4: Logout User', () => {

  it('Deve realizar login e logout corretamente', () => {

    const user = criarUsuario()

    cy.get('a[href="/logout"]').click()

    cy.url().should('include', '/login')
    cy.contains('h2', 'Login to your account').should('be.visible')
  })
})

describe('Caso de Teste 5: Registrar usuário com e-mail já existente', () => {

  it('Deve exibir erro ao tentar registrar com e-mail já existente', () => {

    const user = criarUsuario()

    cy.get('a[href="/logout"]').click()

    cy.contains('h2', 'New User Signup!').should('be.visible')

    cy.get('[data-qa="signup-name"]').type(user.nome)
    cy.get('[data-qa="signup-email"]').type(user.email)

    cy.get('[data-qa="signup-button"]').click()

    cy.contains('p', 'Email Address already exist!').should('be.visible')
  })
})

describe('Caso de Teste 6: Formulário de Contato', () => {
  it('Deve enviar mensagem pelo formulário de contato', () => {
    cy.visit('https://automationexercise.com')

    cy.get('body').should('be.visible')

    cy.contains('Contact us').click()

    cy.contains('h2', 'Get In Touch').should('be.visible')

    cy.get('[data-qa="name"]').type('Danilo Tester')
    cy.get('[data-qa="email"]').type('danilotester@teste.com')
    cy.get('[data-qa="subject"]').type('Dúvida sobre o site')
    cy.get('[data-qa="message"]').type('Olá! Estou testando o formulário de contato.')

    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/teste.txt')

    cy.get('[data-qa="submit-button"]').click()

    cy.on('window:alert', (msg) => {
      expect(msg).to.equal('Press OK to proceed!')
    })

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible')

    cy.contains('Home').click()

    cy.url().should('eq', 'https://automationexercise.com/')
  })
})

describe('Caso de Teste 8: Verificar todos os produtos e a página de detalhes', () => {
  it('Deve exibir lista de produtos e detalhes do primeiro produto', () => {
    cy.visit('https://automationexercise.com')

    cy.get('body').should('be.visible')

    cy.contains('Products').click()

    cy.url().should('include', '/products')

    cy.contains('All Products').should('be.visible')

    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0)

    cy.get('.features_items .col-sm-4').first().contains('View Product').click()

    cy.url().should('include', '/product_details')

    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible')             
      cy.contains('Category').should('be.visible')   
      cy.contains('Rs.').should('be.visible')        
      cy.contains('Availability').should('be.visible')
      cy.contains('Condition').should('be.visible')
      cy.contains('Brand').should('be.visible')
    })
  })
})

describe('Caso de Teste 9: Buscar Produto', () => {
  it('Deve buscar um produto e verificar os resultados', () => {
    cy.visit('https://automationexercise.com')

    cy.get('body').should('be.visible')

    cy.contains('Products').click()

    cy.url().should('include', '/products')

    cy.contains('All Products').should('be.visible')

    cy.get('#search_product').type('Tshirt')
    cy.get('#submit_search').click()

    cy.contains('Searched Products').should('be.visible')

    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0)
  })
})

describe('Caso de Teste 10: Verificar Assinatura na Página Inicial', () => {
  it('Deve realizar a assinatura e verificar a mensagem de sucesso', () => {
    cy.visit('https://automationexercise.com')

    cy.get('body').should('be.visible')

    cy.scrollTo('bottom')

    cy.contains('Subscription').should('be.visible')

    const email = `teste_${Date.now()}@email.com`
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()

    cy.contains('You have been successfully subscribed!').should('be.visible')
  })
})

describe('Caso de Teste 15: Fazer Pedido — Registrar Antes do Checkout', () => {
    const user = {
        name: `User${Date.now()}`,
        email: `user${Date.now()}@test.com`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        company: 'Test',
        address1: '123 Test Street',
        address2: 'Apt 101',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '1234567890'
    };

    const payment = {
        nameOnCard: 'Test User',
        cardNumber: '410000000000',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2025'
    };

    it('Deve registrar, fazer um pedido e deletar a conta', () => {
        cy.visit('http://automationexercise.com');

        cy.get('header .logo').should('be.visible');

        cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

        cy.get('[data-qa="signup-name"]').type(user.name);
        cy.get('[data-qa="signup-email"]').type(user.email);
        cy.get('[data-qa="signup-button"]').click();

        cy.get('#id_gender1').check(); // Mr.
        cy.get('[data-qa="password"]').type(user.password);
        cy.get('[data-qa="days"]').select('1');
        cy.get('[data-qa="months"]').select('January');
        cy.get('[data-qa="years"]').select('1990');

        cy.get('[data-qa="first_name"]').type(user.firstName);
        cy.get('[data-qa="last_name"]').type(user.lastName);
        cy.get('[data-qa="company"]').type(user.company);
        cy.get('[data-qa="address"]').type(user.address1);
        cy.get('[data-qa="address2"]').type(user.address2);
        cy.get('[data-qa="country"]').select(user.country);
        cy.get('[data-qa="state"]').type(user.state);
        cy.get('[data-qa="city"]').type(user.city);
        cy.get('[data-qa="zipcode"]').type(user.zipcode);
        cy.get('[data-qa="mobile_number"]').type(user.mobileNumber);

        cy.get('[data-qa="create-account"]').click();

        cy.get('[data-qa="account-created"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

        cy.get('.shop-menu > .nav > :nth-child(10) > a').should('contain', `Logged in as ${user.name}`);

        cy.get('.features_items .product-overlay').first().invoke('show');
        cy.get('.features_items .add-to-cart').first().click();
        
        cy.get('.modal-content .btn-success').click();

        cy.get('.shop-menu > .nav > :nth-child(3) > a').click();

        cy.url().should('include', '/view_cart');
        cy.get('#cart_info').should('be.visible');

        cy.get('.col-sm-6 > .btn').click();

        cy.get('#address_delivery').should('contain', user.firstName);
        cy.get('#address_delivery').should('contain', user.address1);
        cy.get('#address_invoice').should('contain', user.firstName);
        cy.get('#address_invoice').should('contain', user.address1);
        cy.get('.table.table-condensed').should('be.visible'); // Review Your Order table

        cy.get('.form-control').type('Pedido de teste Cypress.');
        cy.get(':nth-child(7) > .btn').click();

        cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard);
        cy.get('[data-qa="card-number"]').type(payment.cardNumber);
        cy.get('[data-qa="cvc"]').type(payment.cvc);
        cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth);
        cy.get('[data-qa="expiry-year"]').type(payment.expiryYear);

        cy.get('[data-qa="pay-button"]').click();

        cy.contains('Your order has been confirmed!').should('be.visible')

        cy.get('.shop-menu > .nav > :nth-child(5) > a').click();

        cy.get('[data-qa="account-deleted"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
    });
});
