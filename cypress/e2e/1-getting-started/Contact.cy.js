describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.findByRole("link", { name: /contact/i }).click();
  });
  it("should display the 'Our Information' heading", () => {
    cy.findByRole("heading", { name: /Our Information/i }).should("be.visible");
  });
  it("should display the contact information", () => {
    cy.findByText(/Phone:/i).should("be.visible");
    cy.findByText(/Email:/i).should("be.visible");
    cy.findByText(/Address:/i).should("be.visible");

    cy.contains(/VueReact@gmail.com/i).should("be.visible");
    cy.contains(/8 705 525 35 84/i).should("be.visible");
    cy.contains(/Address: Kazakhstan, Shymkent/i).should("be.visible");
  });
  it("should display social media links with correct hrefs", () => {
    cy.findByRole("region", { name: /follow us/i }).within(() => {
      cy.findByRole("link", { name: /Facebook/i }).should("have.attr", "href", "https://www.facebook.com/abdu248616");

      cy.findByRole("link", { name: /WhatsApp/i }).should("have.attr", "href", "https://wa.me/87782523794");

      cy.findByRole("link", { name: /Twitter/i }).should("have.class", "text-decoration-line-through");

      cy.findByRole("link", { name: /Instagram/i }).should("have.class", "text-decoration-line-through");
    });
  });
});
