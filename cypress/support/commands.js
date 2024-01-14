Cypress.Commands.add("fetch", ({ role, portal, page }) => {
  cy.intercept("/api/auth/session", { fixture: `${role}_role.json` }).as(
    "session"
  );
  cy.intercept("GET", `/api/dashboard/${page}`, {
    fixture: `${page}.json`,
  }).as("GET");

  cy.intercept("GET", `https://www.googleapis.com/calendar/v3/calendars/**`, {
    fixture: "schedule.json",
  }).as("schedule");

  cy.visit("/");
  cy.wait("@session");

  cy.visit(`/${portal}/${page}`);
  cy.wait("@schedule");
  cy.wait("@GET");
});

Cypress.Commands.add("action", ({ tag, page }) => {
  cy.intercept("PUT", `/api/dashboard/${page}`, {
    message: "OK",
    status: 200,
  }).as("PUT");
  cy.get('[data-cy="toolbar"]').find(`[data-cy="${tag}-tag"]`).click();
  cy.wait("@PUT");
});

Cypress.Commands.add("delete", ({ page }) => {
  cy.intercept("DELETE", `/api/dashboard/${page}?remove=*`, {
    message: "OK",
    status: 200,
  }).as("DELETE");
  cy.get('[data-cy="toolbar"]').find('[data-cy="delete"]').click();
  cy.get('[data-cy="popup"]').find('[data-cy="confirm-button"]').click();
  cy.wait("@DELETE");
});
