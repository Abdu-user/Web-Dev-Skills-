import { defineStore } from "pinia";

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
  createdDate: Date;
}

interface ToDoState {
  todos: ToDo[];
  todoText: string;
  datalist: string[];
  possibleDatalistOptions: {
    [key: string]: number;
  };
  settings: {
    hideCompleted: boolean;
  };
}
const saveTheTodoStoreState = () => {
  const todoStore = useToDoStore();
  console.log(JSON.parse(JSON.stringify(todoStore.$state)));
  localStorage.setItem("todoStoreState", JSON.stringify(todoStore.$state));
};

export const useToDoStore = defineStore("todo", {
  state: (): ToDoState => ({
    todos: [],
    todoText: "",
    datalist: ["Buy groceries", "Complete homework", "Walk the dog", "Call mom", "Read a book", "Exercise", "Plan the week"],
    possibleDatalistOptions: {},
    settings: {
      hideCompleted: false,
    },
  }),
  actions: {
    addTodo(text: string) {
      // console.log(new Date());
      const newTodo: ToDo = {
        id: Date.now(),
        text,
        completed: false,
        createdDate: new Date(),
      };
      this.todos.push(newTodo);
      this.addPossibleDatalistOption(text);

      this.todoText = "";
      saveTheTodoStoreState();
    },
    addPossibleDatalistOption(text: string) {
      if (!this.possibleDatalistOptions[text]) this.possibleDatalistOptions[text] = 0;
      this.possibleDatalistOptions[text]++;
    },
    updateSingleTodo(toDoId: number, cb: (todo: ToDo) => ToDo) {
      const todo = this.todos.find((t) => toDoId === t.id);
      if (!todo) return console.error(`Todo with id ${toDoId} not found`);

      cb(todo);
      saveTheTodoStoreState();
    },
    toggleTodoComplete(id: number) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      saveTheTodoStoreState();
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      saveTheTodoStoreState();
    },
    getTodosFromStorage() {
      // Retrieve the serialized todo store state from localStorage
      const isTodoStore = localStorage.getItem("todoStoreState");
      if (!isTodoStore) return;

      // Parse the retrieved data into an object
      const todoStore = JSON.parse(isTodoStore);
      console.log(todoStore);

      // Bring the Date object back to the date props in todos
      if (todoStore && todoStore.todos) {
        this.todos = todoStore.todos.map((todo: ToDo) => {
          todo.createdDate = new Date(todo.createdDate);
          return todo;
        });
      }

      // Restore the todo text
      this.todoText = todoStore.todoText;

      // Restore the datalist if it exists
      if (todoStore && todoStore.datalist) {
        this.datalist = todoStore.datalist;
      }

      // Restore and update possibleDatalistOptions, adding valid options to the datalist
      if (todoStore && todoStore.possibleDatalistOptions) {
        this.possibleDatalistOptions = todoStore.possibleDatalistOptions;

        for (const [key, value] of Object.entries(this.possibleDatalistOptions)) {
          if (value >= 3 && !this.datalist.includes(key)) {
            this.datalist.push(key);
          }
        }
      }

      // Restore user settings if they exist
      if (todoStore && todoStore.settings) {
        this.settings = todoStore.settings;
      }

      this.updateToDos();
    },
    updateToDos() {
      for (let i = 0; i < this.todos.length; i++) {
        const todo = this.todos[i];
        if (!todo.createdDate) todo.createdDate = new Date();
      }
    },
    settingsActions: () => {
      return {
        toggleHideCompleted: () => {
          const todoStore = useToDoStore();
          todoStore.settings.hideCompleted = !todoStore.settings.hideCompleted;
          saveTheTodoStoreState();
        },
      };
    },
  },
  getters: {
    conditionalTodos(): ToDo[] {
      return this.todos.filter((todo) => {
        if (this.settings.hideCompleted && todo.completed) return false;

        return true;
      });
    },
    groupedTodos(): Record<string, ToDo[]> {
      return this.conditionalTodos.reduce((group: Record<string, ToDo[]>, todo: ToDo) => {
        const date = todo.createdDate.toISOString().split("T")[0];

        if (!group[date]) {
          group[date] = [];
        }

        group[date].push(todo);
        return group;
      }, {});
    },
  },
});
