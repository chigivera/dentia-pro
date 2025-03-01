describe("Appointment Scheduling", () => {
  it("allows a user to schedule an appointment", () => {
    cy.visit("/appointments/new")

    cy.get('input[name="patientName"]').type("John Doe")
    cy.get('input[name="appointmentDate"]').type("2023-12-01")
    cy.get('select[name="appointmentTime"]').select("10:00 AM")
    cy.get('select[name="doctorId"]').select("1")
    cy.get('input[name="appointmentType"]').type("Check-up")

    cy.get('button[type="submit"]').click()

    cy.contains("Appointment scheduled successfully").should("be.visible")
  })
})

