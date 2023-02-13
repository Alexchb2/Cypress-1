
  beforeEach(() => {
    cy.visit('/')
  })

  it("Should successfully login", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Shows error in case of empty login", () => {
    cy.login(null, 'test');
    cy.get("#mail")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((elements) => elements[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Shows error in case of non-email login", () => {
    cy.login('wrongtext', 'test');
    cy.get("#mail")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((elements) => elements[0].validationMessage)
      .should("contain", 'Адрес электронной почты должен содержать символ "@". В адресе "wrongtext" отсутствует символ "@".');
  });