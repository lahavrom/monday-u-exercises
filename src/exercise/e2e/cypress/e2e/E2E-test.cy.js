describe("Add Todo Action", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should add a new todo", () => {
    cy.get("div.bottom").should("be.visible");
    const input = cy.get("input#newTask");
    const addBtn = cy.get("button#addBtn");
    input.type("new task");
    addBtn.click();
    cy.get("div.taskSection").last().should("be.visible");
  });
});

describe("Chande Task Status", () => {
  it("Should change todo status", () => {
    const checkbox = cy
      .get(
        "div.monday-style-checkbox__checkbox.monday-style-checkbox__prevent-animation"
      )
      .last();
    checkbox.click();
    cy.get("input.monday-style-checkbox__input").last().should("be.checked");
  });
});

describe("Add numerous tasks", () => {
  it("Should add numerous tasks", () => {
    cy.get("input#newTask").type("1,2,3,4,5");
    cy.get("button#addBtn").click();
    cy.get(".taskList").contains("charmander");
  });
});

describe("Delete Task", () => {
  it("Should delete task", () => {
    cy.get("input#newTask").type("delete this task");
    cy.get("button#addBtn").click();
    const deleteBtn = cy.get(".deleteBtn").last();
    deleteBtn.invoke("show").should("be.visible");
    deleteBtn.click();
    cy.get("div.task")
      .last()
      .invoke("text")
      .should("not.eq", "delete this task");
    cy.wait(1500);
  });
});

describe("Delete All tasks", () => {
  it("Should delete all tasks", () => {
    cy.get("button.functionBtn").last().click();
    cy.get("div.taskList").should("be.empty");
  });
});
