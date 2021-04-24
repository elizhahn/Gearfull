import { getItems } from "../../../src/ApiCalls";

describe ("Landing Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  })
  it("should display a user form to access dashboard", () => {
    cy.get("[data-cy=user-portal]").should("contain", "Cool title here")
    cy.get("[data-cy=user-portal]").type("Elizabeth");
    cy.get("[data-cy=user-portal-btn]").click();
    cy.url().should('include', '/dashboard');
  })
})

describe("User Dashboard", () => {
  beforeEach(() => {
    
    // cy.fixture("/items.json").then((data) => {
    //   data.forEach((shelf, i) => {
    //   cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${baskets[i]}`, {fixture: "items.json"})
    //   });
    // });
    // cy.intercept({
    //   method: "POST",
    //   url: "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/sleep system"
    // },
    // {
    //   statusCode: 201,
    //   body: {
    //     message: "You've added sleep system to your baskets"
    //   }
    // }) 
    // cy.intercept({
    //   method: "POST",
    //   url: "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/cook system"
    // },
    // {
    //   statusCode: 201,
    //   body: {
    //     message: "You've added cook system to your baskets"
    //   }
    // })

    // cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/sleep system", {fixture: "item1.json"})
    // cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/cook system", {fixture: "item2.json"})
    // cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"})

    // const baskets = ["sleep system", "cook system"];
    // baskets.forEach(basket => {
    // cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/${basket}`, {fixture: "item1.json"})
    // });

    cy.visit("http://localhost:3000/")
    cy.get("[data-cy=user-portal]").type("Elizabeth");
    cy.get("[data-cy=user-portal-btn]").click();
  })
  it("should display a user's name and main dashboard features upon load", () => {
    cy.get("[data-cy=dashboard-title]").contains("Cool Title Here");
    cy.get("[data-cy=greeting]").contains("Welcome Elizabeth");
    cy.get("[data-cy=shelves-intro]").contains("Here are some shelves to get you started...")

    cy.get("[data-cy=add-shelf-form]").should("exist");
    cy.get("[data-cy=add-shelf-btn]").contains("add a shelf");
    cy.get("[data-cy=shelves]").contains("navigation");
    cy.get("[data-cy=shelves]").contains("cook system");
    cy.get("[data-cy=statistics-box]").should("contain", "Base Weight")
      .and("contain", "0.00 Oz")
      .and("contain", "0.00 Lbs")
      .and("contain","The Breakdown")
      .and("contain", "navigation")
      .and("contain", "cook system");
    cy.get("[data-cy=shelf-weight-oz]").contains("0.00 Oz")
    cy.get("[data-cy=shelf-weight-lb]").contains("0.00 Lbs")
    

  })
})