describe("create order", function () {
  before(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should scroll after continue sauce tab", function () {
    cy.get("[class^=tab_tab]").contains("Соусы").click();
    cy.contains("Соус Spicy-X");
  });

  it("should scroll after continue toppings tab", function () {
    cy.get("[class^=tab_tab]").contains("Начинки").click();
    cy.contains("Говяжий метеорит (отбивная)");
  });

  it("should add sauce", function () {
    cy.contains("Соус фирменный Space Sauce").trigger("dragstart");
    cy.get("[data-test-id^=burger-constructor]").trigger("drop");
    cy.get("[data-test-id^=burger-constructor]").contains(
      "Соус фирменный Space Sauce"
    );
  });

  it("should delete sauce", function () {
    cy.get("[class^=constructor-element__action]").click();
    cy.get("[data-test-id^=burger-constructor]")
      .contains("Соус фирменный Space Sauce")
      .should("not.exist");
  });

  it("should if the bun is not added, the order confirmation button is inactive", function () {
    cy.contains("Соус фирменный Space Sauce").trigger("dragstart");
    cy.get("[data-test-id^=burger-constructor]").trigger("drop");
    cy.get("[data-test-id^=burger-constructor]").contains(
      "Соус фирменный Space Sauce"
    );
    cy.get("[class^=button_button]").should("be.disabled");
  });

  it("should change the count of the selected ingredient", function () {
    cy.contains("Сыр с астероидной плесенью").trigger("dragstart");
    cy.get("[data-test-id^=burger-constructor]").trigger("drop");
    cy.contains("Сыр с астероидной плесенью").trigger("dragstart");
    cy.get("[data-test-id^=burger-constructor]").trigger("drop");
    cy.get("[class^=counter_counter__num]").last().contains("2");
  });

  it("should if the bun is added, the order confirmation button is active", function () {
    cy.contains("Краторная булка N-200i").trigger("dragstart");
    cy.get("[data-test-id^=burger-constructor]").trigger("drop");
    cy.get("[data-test-id^=burger-constructor]").contains(
      "Краторная булка N-200i"
    );
    cy.get("[class^=button_button]").should("not.be.disabled");
  });

  it("should submit order and open order-modal after continue order-button, close modal after continue close-button click", function () {
    cy.get("[class^=button_button]").contains("Оформить заказ").click();
    cy.contains("Вход");
    cy.get("[class^=input__icon]").first().click();
    cy.get("input[name=email]").type("kirill23sm@ya.ru");
    cy.get("[class^=input__icon]").last().click();
    cy.get("input[name=password]").type(`12341234{enter}`);
    cy.contains("Собери бургер");
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Загрузка...");
    cy.wait(40000);
    cy.contains("идентификатор заказа").should("be.visible");
    cy.get("[class^=modal_button]").click();
    cy.contains("идентификатор заказа").should("not.exist");
  });

  it("should open profile page after continue profile-button click, if the user is authorized", function () {
    cy.get("a").contains("Личный кабинет").click();
    cy.contains("Профиль");
    cy.get("input[name=name]").should("have.value", "QIWI CARD")
    cy.get("input[name=email]").should("have.value", "kirill23sm@ya.ru")
  });
});
