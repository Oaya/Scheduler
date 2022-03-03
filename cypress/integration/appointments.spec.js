describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get('[data-testid="student-name-input"]').type(
      "Lydia Miller-Jones"
    );
    cy.get("[Alt='Sylvia Palmer']").click();
    cy.contains("Save").click();

    cy.contains(
      ".appointment__card--show",
      "Lydia Miller-Jones"
    );
    cy.contains(
      ".appointment__card--show",
      "Sylvia Palmer"
    );
  });

  it("should edit and interview", () => {
    cy.get(".appointment__card").trigger("mouseover");
    cy.get('[alt="Edit"]').should("be.visible");

    cy.get('[alt="Edit"]').click();

    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Lydia Miller-Jones");

    cy.get('[alt="Tori Malcolm"]').click();

    cy.contains("Save").click();

    cy.contains(
      ".appointment__card--show",
      "Lydia Miller-Jones"
    );
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(
      ".appointment__card--show",
      "Archie Cohen"
    ).should("not.exist");
  });
});
