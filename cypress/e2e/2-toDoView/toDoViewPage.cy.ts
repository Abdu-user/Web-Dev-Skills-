describe("ToDo View Page", () => {
  beforeEach(() => {
    // Visit the ToDo View Page before each test
    cy.visit("/todo");
  });
  it("expect we are at the right page", () => {
    cy.findByRole("heading", { name: /to-do list/i }).should("be.visible");
  });
});
