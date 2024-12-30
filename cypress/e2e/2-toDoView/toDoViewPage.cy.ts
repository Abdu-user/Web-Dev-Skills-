const regexOpenTodoMenuButton = /Open options menu for this to-do/i;
describe("ToDo View Page", () => {
  beforeEach(() => {
    // Visit the ToDo View Page before each test
    cy.visit("/todo");
  });
  it("expect we are at the right page by clicking the link", () => {
    cy.visit("/");
    cy.findByRole("link", { name: /todo/ }).should("be.visible").click();

    cy.findByRole("heading", { name: /to-do list/i }).should("be.visible");
  });
  const addNewTask = (todoText: string) => {
    // Type the new task into the input field
    cy.findByRole("combobox", { name: /add a new task/i }).type(todoText);

    cy.findByRole("button", { name: /add/i }).click();
  };

  it("add a new task by typing", () => {
    // addNewTask("Sold Antonio Bnaderas 3g");
    // Ensure the "Add" button is visible, exists, and is initially disabled
    const todoText = "Sold Antonio Bnaderas 3g";
    cy.findByRole("button", { name: /add/i }).should("be.visible").should("exist").should("be.disabled");

    // Ensure the input field is empty initially
    cy.findByRole("combobox", { name: /add a new task/i }).should("have.value", "");

    // Type the new task into the input field
    cy.findByRole("combobox", { name: /add a new task/i })
      .should("exist")
      .should("be.visible")
      .type(todoText);

    // Verify the input field contains the typed text
    cy.findByRole("combobox", { name: /add a new task/i }).should("have.value", todoText);

    // Ensure the "Add" button is enabled after typing the task
    cy.findByRole("button", { name: /add/i }).should("be.not.disabled").click();

    // Verify the input field is cleared after adding the task
    cy.findByRole("combobox", { name: /add a new task/i }).should("have.value", "");

    // Ensure the "Add" button is disabled again after adding the task
    cy.findByRole("button", { name: /add/i }).should("be.disabled");

    // Verify the new task appears in the list
    // @ts-ignore .scrollIntoView Exist on cypress
    cy.get("li").contains(new RegExp(todoText)).scrollIntoView().should("exist").should("be.visible");
  });
  it("add a new task by selecting from combobox", () => {
    // Ensure the "Add" button is visible, exists, and is initially disabled
    cy.findByRole("button", { name: /add/i }).should("be.visible").should("exist").should("be.disabled");

    // Ensure the input field is empty initially
    cy.findByRole("combobox", { name: /add a new task/i }).should("have.value", "");

    // Focus on the input field to trigger the datalist
    cy.findByRole("combobox", { name: /add a new task/i }).focus();

    // Select an option from the datalist
    cy.get("datalist option").each((option, index) => {
      if (index !== undefined && index < 4) {
        const val = option.val();
        cy.findByRole("combobox", { name: /add a new task/i })
          .type(val)
          .should("have.value", val);

        // Ensure the "Add" button is enabled after selecting the task
        cy.findByRole("button", { name: /add/i }).should("not.be.disabled").click();

        // Verify the input field is cleared after adding the task
        cy.findByRole("combobox", { name: /add a new task/i }).should("have.value", "");

        // Ensure the "Add" button is disabled again after adding the task
        cy.findByRole("button", { name: /add/i }).should("be.disabled");

        // Verify the new task appears in the list
        cy.get("li").contains(new RegExp(val)).should("exist").should("be.visible");
      }
    });
  });

  it("delete a single task", () => {
    const taskToDelete = "Dior Savage";

    // Add the task to be deleted
    addNewTask(taskToDelete);

    // Verify the task appears in the list
    cy.findByRole("listitem", { name: new RegExp(taskToDelete, "i") })
      .should("exist")
      .should("be.visible");

    // Click the delete button for the task
    cy.findByRole("listitem", { name: new RegExp(taskToDelete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /delete/i })
      .click();

    // Confirm the deletion
    // @ts-ignore
    cy.on("window:confirm", (text) => {
      // @ts-ignore
      expect(text).to.contains("Are you sure you want to delete this todo?");
      return true; // Clicks 'OK' on the confirm window
    });

    // Verify the task is removed from the list
    cy.findByRole("listitem", { name: new RegExp(taskToDelete, "i") }).should("not.exist");
  });

  it("toggle a task as completed", () => {
    const taskToComplete = "Complete the project";

    // Add the task to be completed
    addNewTask(taskToComplete);

    // Verify the task appears in the list
    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .should("exist")
      .should("be.visible");

    // Click the checkbox to mark the task as completed
    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      // @ts-ignore
      .scrollIntoView()
      .click()
      .parent()
      .findByRole("checkbox", { name: /complete/i })
      .check()
      .should("be.checked");

    // Uncheck the checkbox to mark the task as not completed
    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("checkbox", { name: /complete/i })
      .uncheck()
      .should("not.be.checked");

    // Verify the task is no longer marked as completed
    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      // @ts-ignore
      .scrollIntoView()
      .click();

    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      // @ts-ignore
      .scrollIntoView()
      .click()
      .parent()
      .findByRole("checkbox", { name: /complete/i })
      .check()
      .should("be.checked");

    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      // @ts-ignore
      .scrollIntoView()
      .click();

    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      // @ts-ignore
      .scrollIntoView()
      .click()
      .parent()
      .findByRole("checkbox", { name: /complete/i })
      .uncheck()
      .should("not.be.checked");

    cy.findByRole("listitem", { name: new RegExp(taskToComplete, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click();
  });

  it("edit an existing task by saving it using ctrl+Enter", () => {
    const originalTask = "Original Task";
    const editedTask = "Edited Task";

    // Add the original task
    addNewTask(originalTask);

    // Verify the original task appears in the list
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") })
      .should("exist")
      .should("be.visible");

    // Click the edit button for the task
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      .click();

    // Edit the task text
    cy.findByRole("textbox", { name: new RegExp(originalTask, "i") })
      .clear()
      .type(editedTask)
      .should("have.value", editedTask)
      .type("{ctrl}{enter}");
    cy.findByRole("textbox", { name: new RegExp(originalTask, "i") }).should("not.exist");

    // Verify the edited task appears in the list
    cy.findByRole("listitem", { name: new RegExp(editedTask, "i") })
      .should("exist")
      .should("be.visible");

    // Verify the original task is no longer in the list
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") }).should("not.exist");
  });
  it("edit an existing task by saving it using save button", () => {
    const originalTask = "Original Task";
    const editedTask = "Edited Task";

    // Add the original task
    addNewTask(originalTask);

    // Verify the original task appears in the list
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") })
      .should("exist")
      .should("be.visible");

    // Click the edit button for the task
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      .click();

    // Edit the task text
    cy.findByRole("textbox", { name: new RegExp(originalTask, "i") })
      .clear()
      .type(editedTask)
      .should("have.value", editedTask);

    cy.findByRole("listitem", { name: new RegExp(editedTask, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /save/i })
      .click();

    cy.findByRole("textbox", { name: new RegExp(originalTask, "i") }).should("not.exist");

    // Verify the edited task appears in the list
    cy.findByRole("listitem", { name: new RegExp(editedTask, "i") })
      .should("exist")
      .should("be.visible");

    // Verify the original task is no longer in the list
    cy.findByRole("listitem", { name: new RegExp(originalTask, "i") }).should("not.exist");
  });

  it("add multiple new tasks", () => {
    const tasks = ["Buy groceries", "Walk the dog", "Read a book", "Write some code", "Exercise"];

    tasks.forEach((task) => {
      addNewTask(task);
    });
    cy.findByRole("listitem", { name: new RegExp(tasks[4], "i") })
      .should("exist")
      .should("be.visible")
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .should("exist")
      // @ts-ignore
      .scrollIntoView()
      .should("be.visible")
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      // @ts-ignore
      .scrollIntoView()
      .should("exist")
      .should("be.visible")
      .click()
      .should("not.exist");

    // cy.wait(1000);

    cy.findByRole("listitem", { name: new RegExp(tasks[4], "i") })
      .findByRole("textbox", { name: new RegExp(tasks[4], "i") })
      .should("be.focused")
      .type(" not exist");

    // @ts-ignore
    cy.on("window:confirm", (text) => {
      return true;
    });
    cy.findByRole("listitem", { name: new RegExp(tasks[3], "i") })
      .should("exist")
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .should("be.visible")
      .should("have.attr", "aria-expanded", "false")
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      .should("exist")
      .should("be.visible")
      .click()
      .should("not.exist");

    cy.findByRole("listitem", { name: new RegExp(tasks[4], "i") }).should("exist");
    cy.findByRole("listitem", { name: /exercise not exist/i }).should("not.exist");
    // @ts-ignore
    // cy.on("window:confirm", (text) => {
    //   return false;
    // });

    cy.findByRole("listitem", { name: new RegExp(tasks[3], "i") })
      .findByRole("textbox")
      .type(" not exist 3{ctrl}{enter}");
    cy.findByRole("listitem", { name: new RegExp(tasks[3], "i") })
      .findByRole("textbox")
      .should("not.exist");
  });
  it("edit a task but don't save, then edit another task", () => {
    const tasks = ["First Task", "Second Task"];
    const editText = " - Edited";

    // Add the tasks
    tasks.forEach((task) => {
      addNewTask(task);
    });

    // Edit the first task
    cy.findByRole("listitem", { name: new RegExp(tasks[0], "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      .click()
      .should("not.exist");

    // Add some text to the first task
    cy.findByRole("textbox", { name: new RegExp(tasks[0], "i") })
      .type(editText)
      .should("have.value", tasks[0] + editText);

    // Attempt to edit the second task without saving the first edit
    cy.findByRole("listitem", { name: new RegExp(tasks[1], "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /edit/i })
      .click();

    // Check if the edit button on the first task does not exist
    cy.findByRole("listitem", { name: new RegExp(tasks[0] + editText, "i") })
      .findByRole("button", { name: /edit/i })
      .should("not.exist");
    // @ts-ignore
    cy.on("window:confirm", () => false);

    // Check if the edit text and the textbox on the first task still exist
    cy.findByRole("listitem", { name: new RegExp(tasks[0] + editText, "i") })
      .should("exist")
      .findByRole("textbox", { name: new RegExp(tasks[0] + editText, "i") })
      .should("exist");
    // Toggle the second task's options menu to close and open
    cy.findByRole("listitem", { name: new RegExp(tasks[1], "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .click();

    // Save the first task
    cy.findByRole("listitem", { name: new RegExp(tasks[0] + editText, "i") })
      .findByRole("button", { name: regexOpenTodoMenuButton })
      .click()
      .parent()
      .findByRole("button", { name: /save/i })
      .click();

    // Verify the edited task appears in the list
    cy.findByRole("listitem", { name: new RegExp(tasks[0] + editText, "i") })
      .should("exist")
      .should("be.visible");

    // Verify the original task is no longer in the list
    cy.findByRole("listitem", { name: tasks[0] }).should("not.exist");
  });
  it("expect to have a div with today's date inside ul", () => {
    const today = new Date();
    const options = { month: "short", day: "numeric" };
    // @ts-ignore
    const formattedDate = today.toLocaleDateString("en-US", options).toLowerCase();

    // Add a new task to ensure the date is displayed
    addNewTask("Sample Task");
    cy.wait(2);

    cy.findByRole("list", { name: /To-do list items/i }).within(() => {
      cy.findByRole("heading", { name: new RegExp(formattedDate, "i") })
        .contains(new RegExp(formattedDate, "i"))
        .should("exist")
        .should("be.visible");
    });
  });
});
