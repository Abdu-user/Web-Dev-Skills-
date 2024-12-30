describe("Vue app test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it('check if "Vue app" text exists and navigation works', () => {
    cy.contains(/Vue App/i);

    const checkLink = (text: string | RegExp) => {
      return cy.findByRole("link", { name: text }).should("be.visible").should("exist");
    };

    checkLink(/about/i);
    checkLink(/home/i);
    checkLink(/contact/i);

    checkLink(/about/i).click();
    cy.location("pathname").should("eq", "/about");

    checkLink(/home/i).click();
    cy.location("pathname").should("eq", "/");

    checkLink(/contact/i).click();
    cy.location("pathname").should("eq", "/contact");
  });

  it("test navBar links", () => {
    cy.findByRole("link", { name: /about/i }).should("exist").click();
    cy.contains(/About abdurrakhman/i);
    cy.findByRole("heading", { name: /about abdurrakhman/i }).should("exist");
    cy.findByRole("link", { name: /chatGpt/i })
      .then(($el) => {
        $el[0].scrollIntoView();
      })
      .should("exist");
  });

  it("should render the theme toggler button and default icon based on the theme", () => {
    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i }).should("exist");

    cy.findByRole("img", { name: /The moon icon/i }).should("exist");

    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");
  });

  it("should toggle to light theme and show the sun icon", () => {
    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");

    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i }).click();

    cy.findByRole("img", { name: /The sun icon/i }).should("exist");

    cy.findByRole("img", { name: /The moon icon/i }).should("not.exist");
  });

  it("should toggle back to dark theme after another click", () => {
    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");

    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i }).click();

    cy.findByRole("img", { name: /The sun icon/i }).should("exist");

    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i }).click();

    cy.findByRole("img", { name: /The moon icon/i }).should("exist");

    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");
  });

  it("should respond to keyboard interaction (Space key) and toggle the theme", () => {
    cy.findByRole("img", { name: /The sun icon/i }).should("not.exist");

    cy.findByRole("button", { name: /Toggle to Light\/Dark Theme/i })
      .focus()
      .type(" ");

    cy.findByRole("img", { name: /The sun icon/i })
      .should("exist")
      .should("be.visible");

    cy.findByRole("img", { name: /The moon icon/i }).should("not.exist");
  });
});
