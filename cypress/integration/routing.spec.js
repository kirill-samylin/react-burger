describe("app works correctly with routes", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open burger-constructor page with a list of ingredients by default", function () {
    cy.contains("Собери бургер");
    cy.contains("Перенесите нужные ингредиенты для бургера.");
    cy.contains("Мясо бессмертных моллюсков Protostomia");
  });

  it("should open order-history page after continue feed-button click", function () {
    cy.get("a").contains("Лента заказов").click();
    cy.contains("Выполнено за все время:");
  });

  it("should open login page after continue profile-button click, if the user is not authorized", function () {
    cy.get("a").contains("Личный кабинет").click();
    cy.contains("Вход");
  });

  it("should open main page after continue constructor-button click", function () {
    cy.get("a").contains("Конструктор").click();
    cy.contains("Собери бургер");
  });

  it("should open modal after continue ingredient click, show ingredient`s details and close modal after continue close-button click", function () {
    cy.contains("Соус Spicy-X").click();
    cy.contains("Детали ингредиента").should("be.visible");
    cy.contains("Соус Spicy-X");
    cy.contains("20");
    cy.get("[class^=modal_button]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});
