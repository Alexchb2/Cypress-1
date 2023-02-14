beforeEach(() => {
    cy.visit('/')
    cy.login("test@test.com", "test");
  })

const bookFirst = {
  title: "Война и мир",
  description:
    "«Война́ и мир» — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах.",
  author: "Лев толстой",
};
const bookSecond = {
  title: "Анна Каренина",
  description:
    "«А́нна Каре́нина» — роман Льва Толстого о трагической любви замужней дамы Анны Карениной и блестящего офицера Алексея Вронского на фоне счастливой семейной жизни...",
  author: "Лев толстой",
};


it("Add book", () => {
  cy.AddNew(bookFirst);
  cy.contains(bookFirst.title).should("be.visible");
 });

 it("Add book to favorite", () => {
  cy.addFavoriteBook(bookSecond);
  cy.get('h4').click();
  cy.contains(bookSecond.title).should("be.visible");
 });

 it("Shows error in case of empty add new", () => {
  cy.AddNew(null);
  cy.get("#title")
    .then((elements) => elements[0].checkValidity())
    .should("be.false");
  cy.get("#title")
    .then((elements) => elements[0].validationMessage)
    .should("contain", "Заполните это поле.");
 });

 it("Should delete book from favorite", () => {
  cy.visit("/favorites");
  cy.contains(bookSecond.title)
    .should("be.visible")
    .within(() => cy.get(".card-footer > .btn").click({ force: true }));
  cy.contains(bookSecond.title).should("not.exist");
});