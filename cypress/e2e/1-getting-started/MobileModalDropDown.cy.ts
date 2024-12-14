describe("Test mobile drop down button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(430, 932);
  });
  it("should mobileModal button render", () => {
    // cy.wait(0);
    cy.findByRole("link", { name: /about/i }).should("not.exist");

    cy.findByRole("button", { name: /toggle navigation/i })
      .should("be.visible")
      .click();

    cy.findByRole("link", { name: /about/i }).should("exist").click();
    cy.contains(/abdurrakhman/i);
  });
  it("should render the theme toggler button and default icon based on the theme", () => {
    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i }).should("exist");

    cy.findByRole("img", { name: /The moon icon/i }).should("exist");

    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");
  });
});
