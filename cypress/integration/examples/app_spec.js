describe ("Landing Page", () => {
  beforeEach(() => {

    cy.visit("http://localhost:3000/");
  })
  it("should display a user form to access dashboard", () => {
    cy.get("[data-cy=user-portal]").should("contain", "Gearfull");
    cy.get("[data-cy=user-portal-input]").type("Elizabeth");
    cy.get("[data-cy=user-portal-btn]").click();
    cy.url().should('include', '/dashboard');
  })
})

describe("User Dashboard", () => {
  beforeEach(() => {
    
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"});
    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"});
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy=user-portal-input]").type("Elizabeth");
    cy.get("[data-cy=user-portal-btn]").click();
  
  });
  it("should display a user's name and main dashboard features upon load", () => {
    cy.get("[data-cy=dashboard-title]").contains("Gearfull");
    cy.get("[data-cy=greeting]").contains("Welcome Elizabeth");
    cy.get("[data-cy=home-link]").should("exist");
    cy.get("[data-cy=shelves-intro]").contains('Create some shelves here like "navigation" or "cook system"...');
    cy.get("[data-cy=add-shelf-form]").should("exist");
    cy.get("[data-cy=add-shelf-btn]").contains("add a shelf");
    cy.get("[data-cy=statistics-box]").should("contain", "40.00 Oz")
      .and("contain","2.50 Lbs")
      .and("contain", "The Breakdown");
  });

  it("should display a user's saved gear and weight totals on load", () => {
    cy.get("[data-cy=shelves]").contains("navigation");
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=added-item]").should("contain", "garmin")
    .and("contain", "weight: 40")
    .and("contain", "amount: 1");
    cy.get("[data-cy=pack-weight-oz]").contains("40.00");
    cy.get("[data-cy=pack-weight-lbs]").contains("2.50 Lbs");
    cy.get("[data-cy=shelf-weight-name]").should("contain", "navigation");
    cy.get("[data-cy=shelf-weight-oz]").contains("40.00 Oz");
    cy.get("[data-cy=shelf-weight-lb]").contains("2.50 Lbs");
  });

  it("should take a user back to the landing page", () => {
    cy.get("[data-cy=home-link]").click();
    cy.url().should('include', '/');
    cy.get("[data-cy=user-portal]").should("contain", "Gearfull");

  });
});

describe("Loading messages", () => {
  it("should show an error message if shelves can't be loaded", () => {

    cy.intercept({
      method: 'GET',
      url: 'https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation'
    },
    {
      statusCode: 500,
      body: { 
        message: `Shelves can't be loaded at this time` 
      }
    })
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"});
    cy.visit("http://localhost:3000/dashboard");
    cy.get("[data-cy=loading-error-msg]").contains("We can't load your shelves right now, please try again later");
  });

  it("should show a loading message if shelves are loading", () => {

    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {delay: 1000, fixture:"shelves.json"});
    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {delay: 1000, fixture: "item1.json"});
    cy.visit("http://localhost:3000/dashboard")
    cy.contains('Loading shelves...');

  });

  it("should show a message on load when shelves are empty", () => {
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves_empty.json"});
    cy.visit("http://localhost:3000/dashboard");
    cy.contains("Your shelves are empty");

  });
});

describe("Adding an item", () => {
  beforeEach(() => {

    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"});
    cy.intercept("PUT", "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation", {fixture: "item2.json"}).as("addedItem")
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"}); 
    cy.visit("http://localhost:3000/dashboard");

  });
  it("should let a user add items to their shelf and update the dashboard", () => {
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=expand-icon]").should("have.class", "expanded"); 
    cy.get("[data-cy=item-name-input]").first().type("pocket rocket stove");
    cy.get("[data-cy=item-weight-input]").first().type("34.6");
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.wait("@addedItem")
    cy.wait(1000);
    cy.get("[data-cy=added-item]").eq(1).should("contain", "pocket rocket stove")
    .and("contain", "weight: 34.6")
    .and("contain", "amount: 1");
    cy.get("[data-cy=statistics-box]").should("contain", "74.60 Oz")
    .and("contain", "4.66 Lbs");
    cy.get("[data-cy=shelf-weight-oz]").first().contains("74.60 Oz");
    cy.get("[data-cy=shelf-weight-lb]").first().contains("4.66 Lbs");
  });

  it("should give the user an error message if any form fields are empty", () => {
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").contains("Please fill out all the fields");
    cy.get("[data-cy=added-item]").eq(1).should("not.exist");
    cy.get("[data-cy=item-name-input]").first().type("pocket rocket stove");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").contains("Please fill out all the fields");
    cy.get("[data-cy=added-item]").eq(1).should("not.exist");
    cy.get("[data-cy=item-name-input]").first().clear();
    cy.get("[data-cy=item-weight-input]").first().type("2");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").contains("Please fill out all the fields");
    cy.get("[data-cy=added-item]").eq(1).should("not.exist");
    cy.get("[data-cy=item-weight-input]").clear();
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").contains("Please fill out all the fields");
    cy.get("[data-cy=added-item]").eq(1).should("not.exist");
  });

  it("should give the user an error message if they add a duplicate item", () => {
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=item-name-input]").first().type("garmin");
    cy.get("[data-cy=item-weight-input]").first().type("34.6");
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").contains("This item already exists"); 
  });

  it("should hide the form error message if successful submission was made", () => {
    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=item-name-input]").first().type("pocket rocket stove");
    cy.get("[data-cy=item-weight-input]").first().type("34.6");
    cy.get("[data-cy=item-amount-input]").first().type("1");
    cy.get("[data-cy=item-add-btn]").first().click();
    cy.get("[data-cy=form-error-msg]").should("not.exist");
  });
});

describe("Removing an item", () => {
  beforeEach(() => {

    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"});
    cy.intercept("POST", "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation", {fixture: "item3.json"});
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"});  
    cy.visit("http://localhost:3000/dashboard");
  });

  it("should let a user delete an item they added and update the dashboard", () => {

    cy.get("[data-cy=expand-shelf-btn]").first().click();
    cy.get("[data-cy=added-item]").eq(0);
    cy.get("[data-cy=delete-item-btn]").eq(0).click();
    cy.get("[data-cy=added-item]").should("not.exist");
    cy.get("[data-cy=statistics-box]").should("contain", "0.00 Oz")
    .and("contain", "0.00 Lbs");
    cy.get("[data-cy=shelf-weight-oz]").first().contains("0.00 Oz");
    cy.get("[data-cy=shelf-weight-lb]").first().contains("0.00 Lbs");
  });
});

describe("Adding a shelf", () => {
  beforeEach(() => {

    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"});
    cy.intercept("POST", "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/cooking", {fixture: "item3.json"});
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"}); 
    cy.visit("http://localhost:3000/dashboard");

  });
  it("Lets a user add a shelf and displays helpful messages", () => {
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=add-shelf-msg]").contains("Please create a shelf name");
    cy.get("[data-cy=add-shelf-input]").type("navigation");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=add-shelf-msg]").contains("This shelf already exists");
    cy.get("[data-cy=add-shelf-input]").clear().type("cooking");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=shelves]").contains("cooking");
    cy.get("[data-cy=statistics-box]").should("contain", "cooking");
    cy.get("[data-cy=shelf-weight-oz]").eq(0).contains("0.00 Oz");
    cy.get("[data-cy=shelf-weight-lb]").eq(0).contains("0.00 Lbs");
  });  
});

describe("Deleting a shelf", () => {
  beforeEach(()=> {
    cy.intercept("DELETE", "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/cooking", {fixture: ""});
    cy.intercept(`https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/navigation`, {fixture: "item1.json"});
    cy.intercept("POST", "https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d/basket/cooking", {fixture: "item3.json"});
    cy.intercept("https://getpantry.cloud/apiv1/pantry/929de230-c666-4f11-9602-b7c818abee8d", {fixture:"shelves.json"})  
    cy.visit("http://localhost:3000/dashboard");
  });
  
  it("Displays a modal when delete button is clicked", () => {
    cy.get("[data-cy=add-shelf-input]").type("cooking");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-warning-msg-1]").contains("Are you sure you want to remove this shelf?");
    cy.get("[data-cy=modal-warning-msg-2]").contains("This will delete the shelf and all it's contents");
    cy.get("[data-cy=modal-remove-btn]").contains("Yes remove please");
    cy.get("[data-cy=modal-return-btn]").contains("No take me back");
  
  }); 

  it("Allows a user to go back to the dashbaord if delete button is clicked", () => {
    cy.get("[data-cy=add-shelf-input]").type("cooking");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-return-btn]").contains("No take me back").click();
    cy.get("[data-cy=modal]").should("not.exist"); 
  });

  it("Allows a user to delete a shelf after being warned", () => {
    cy.get("[data-cy=add-shelf-input]").type("cooking");
    cy.get("[data-cy=add-shelf-btn]").click();
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-remove-btn]").click();
    cy.get("[data-cy=modal]").should("not.exist"); 
    cy.get("[data-cy=shelf]").eq(1).should("not.exist"); 
    cy.get("[data-cy=shelves]").should("contain", "navigation")
      .and("not.contain", "cooking"); 
  });

  it("Will adjust pack weight if deleted shelf contained items", () => {
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-remove-btn]").click();
    cy.get("[data-cy=pack-weight-oz]").should("contain", "0.00 Oz");
    cy.get("[data-cy=pack-weight-lbs]").should("contain", "0.00 Lbs");
    cy.get("[data-cy=statistics-box]").should("not.contain", "navigation"); 
  });

  it("should show an empty shelf message when all shelves are delted", () => {
    cy.get("[data-cy=remove-category]").eq(0).click();
    cy.get("[data-cy=modal-remove-btn]").click();
    cy.get("[data-cy=shelves-msg]").contains("Your shelves are empty");
  });
});