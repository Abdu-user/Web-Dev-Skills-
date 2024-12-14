describe("Contact Form", () => {
  beforeEach(() => {
    cy.visit("/"); // Assuming this is the URL of the form page
    cy.findByRole("link", { name: /contact/i }).click();
  });

  it("should display the form fields and submit button", () => {
    // Check that the form elements are visible
    cy.findByRole("heading", { name: /Send Us a Message/i }).should("be.visible");
    cy.findByLabelText(/Name/i).should("be.visible");
    cy.findByLabelText(/Email/i).should("be.visible");
    cy.findByLabelText(/Message/i).should("be.visible");
    cy.findByRole("button", { name: /Submit/i }).should("be.visible");
  });

  it("should display error messages for required fields", () => {
    // Try to submit the form with empty fields
    cy.findByRole("button", { name: /Submit/i }).click();

    // Check if validation error messages are displayed
    cy.findByText(/Name is required/i).should("be.visible");
    cy.findByText(/Email is required/i).should("be.visible");
    cy.findByText(/Message is required/i).should("be.visible");
  });

  it("should display email required when the email input is empty and others are provided", () => {
    // Enter an invalid email and submit the form
    cy.findByLabelText(/name/i).type("some random name");
    cy.findByLabelText(/message/i).type("Repellendus possimus eaque animi sit repellat fugiat laborum architecto");
    cy.findByRole("button", { name: /Submit/i }).click();
    // cy.wait(10);

    cy.findByText(/email is required/i).should("be.visible");
  });

  it("should submit the form successfully when all fields are valid", () => {
    // Fill out the form with valid data
    cy.findByLabelText(/Name/i).type("John Doe");
    cy.findByLabelText(/Email/i).type("johndoe@example.com");
    cy.findByLabelText(/Message/i).type("Hello, I have a question!");

    // Intercept the alert and ensure the form submits
    cy.window().then((win) => {
      // @ts-ignore
      cy.stub(win, "alert").as("alert");
    });

    // Submit the form
    cy.findByRole("button", { name: /Submit/i }).click();

    // Check that the alert was called with the expected message
    cy.get("@alert").should("have.been.calledWith", "Thank you for contacting us!");

    // Check if the form resets (fields should be empty after submit)
    cy.findByLabelText(/Name/i).should("have.value", "");
    cy.findByLabelText(/Email/i).should("have.value", "");
    cy.findByLabelText(/Message/i).should("have.value", "");
  });
});
