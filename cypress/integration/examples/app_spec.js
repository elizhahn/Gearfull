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
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"})
   
    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"})

    
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy=user-portal]").type("Elizabeth");
    cy.get("[data-cy=user-portal-btn]").click();
    

  })
  it.only("should display a user's name and main dashboard features upon load", () => {
    cy.get("[data-cy=dashboard-title]").contains("Gearfull");
    cy.get("[data-cy=greeting]").contains("Welcome Elizabeth");
    cy.get("[data-cy=shelves-intro]").contains("Here are some shelves to get you started...")

    cy.get("[data-cy=add-shelf-form]").should("exist");
    cy.get("[data-cy=add-shelf-btn]").contains("add a shelf");
    cy.get("[data-cy=shelves]").contains("navigation");
    cy.get("[data-cy=statistics-box]").should("contain", "Base Weight")
      .and("contain","The Breakdown");
  });

  it("should display a user's saved gear items on load", () => {
    cy.get("[data-cy=statistics-box]").should("contain",)
    cy.get("[data-cy=shelf-weight-oz]").contains("0.00 Oz")
    cy.get("[data-cy=shelf-weight-lb]").contains("0.00 Lbs")
  })
});

describe("Adding an item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard")
  });

  it("should let a user add items to their shelf and update the dashboard", () => {
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=expand-icon]").should("have.class", "expanded"); 
    cy.get("[data-cy=item-name-input]").first().type("garmin");
    cy.get("[data-cy=item-weight-input]").first().type("40");
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=added-item]").should("contain", "garmin")
    .and("contain", "weight: 40")
    .and("contain", "amount: 1");
    cy.get("[data-cy=statistics-box]").should("contain", "40.00 Oz")
    .and("contain", "2.50 Lbs");
    cy.get("[data-cy=shelf-weight-oz]").first().contains("40.00 Oz")
    cy.get("[data-cy=shelf-weight-lb]").first().contains("2.50 Lbs")
  });
});

describe("Removing an item", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard")
  });

  it("should let a user delete an item they added and update the dashboard", () => {

    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=item-name-input]").first().type("map");
    cy.get("[data-cy=item-weight-input]").first().type("10");
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.wait(1000);
    cy.get("[data-cy=added-item]").eq(1);
    cy.get("[data-cy=delete-item-btn]").eq(1).click();
    cy.get("[data-cy=statistics-box]").should("contain", "40.00 Oz")
    .and("contain", "2.50 Lbs");
    cy.get("[data-cy=shelf-weight-oz]").first().contains("40.00 Oz")
    cy.get("[data-cy=shelf-weight-lb]").first().contains("2.50 Lbs")
  });
});

describe("Adding a shelf", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard")
  });

  it("Lets a user add a shelf and displays helpful messages", () => {
    cy.wait(1000);
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=add-shelf-msg]").contains("Please create a shelf name");
    cy.get("[data-cy=add-shelf-input]").type("navigation");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=add-shelf-msg]").contains("This shelf already exists");
    cy.get("[data-cy=add-shelf-input]").clear().type("sleep system");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=shelves]").contains("sleep system");
    cy.get("[data-cy=statistics-box]").should("contain", "cook system")
    cy.get("[data-cy=shelf-weight-oz]").eq(2).contains("0.00 Oz")
    cy.get("[data-cy=shelf-weight-lb]").eq(2).contains("0.00 Lbs")



  });  
});

describe("Deleting a shelf", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard")
  });

  it("Displays a modal when delete button is clicked", () => {
    cy.get("[data-cy=remove-category]").eq(2).click();
    cy.get("[data-cy=modal-warning-msg-1]").contains("Are you sure you want to remove this shelf?");
    cy.get("[data-cy=modal-warning-msg-2]").contains("This will delete the shelf and all it's contents");
    cy.get("[data-cy=modal-remove-btn]").contains("Yes remove please");
    cy.get("[data-cy=modal-return-btn]").contains("No take me back")
  
  }); 

  it("Allows a user to go back to the dashbaord if delete button is clicked", () => {
    cy.get("[data-cy=remove-category]").eq(2).click();
    cy.get("[data-cy=modal-return-btn]").contains("No take me back").click();
    cy.get("[data-cy=modal]").should("not.exist"); 
  });

  it("Allows a user to delete a shelf after being warned", () => {
    cy.get("[data-cy=remove-category]").eq(2).click();
    cy.get("[data-cy=modal-remove-btn]").click();
    cy.get("[data-cy=shelf]").eq(2).should("not.exist"); 
    cy.get("[data-cy=shelves]").should("contain", "navigation")
      .and("contain", "sleep system"); 

  });

  it("Will adjust pack weight if deleted shelf contained items", () => {
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-remove-btn]").click();
    cy.get("[data-cy=pack-weight-oz]").should("contain", "0.00 Oz");
    cy.get("[data-cy=pack-weight-lbs]").should("contain", "0.00 Lbs")
    cy.get("[data-cy=statistics-box]").should("not.contain", "navigation"); 
  });
  
  
});