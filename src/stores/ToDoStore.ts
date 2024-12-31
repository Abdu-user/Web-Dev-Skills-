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
}
const saveTheTodo = (todos: ToDo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const useToDoStore = defineStore("todo", {
  state: (): ToDoState => ({
    todos: [],
    todoText: "",
    datalist: ["Buy groceries", "Complete homework", "Walk the dog", "Call mom", "Read a book", "Exercise", "Plan the week"],
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
      this.todoText = "";
      saveTheTodo(this.todos);
    },
    updateSingleTodo(toDoId: number, cb: (todo: ToDo) => ToDo) {
      const todo = this.todos.find((t) => toDoId === t.id);
      if (!todo) {
        console.error(`Todo with id ${toDoId} not found`);
        return;
      }
      cb(todo);
      saveTheTodo(this.todos);
    },
    toggleTodoComplete(id: number) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      saveTheTodo(this.todos);
    },

    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      saveTheTodo(this.todos);
    },
    getTodosFromStorage() {
      const isTodos = localStorage.getItem("todos");
      if (isTodos) {
        this.todos = JSON.parse(isTodos).map((todo: ToDo) => {
          todo.createdDate = new Date(todo.createdDate);
          return todo;
        });
      }
      this.updateToDos();
    },
    updateToDos() {
      for (let i = 0; i < this.todos.length; i++) {
        const todo = this.todos[i];
        if (!todo.createdDate) todo.createdDate = new Date();
      }
    },
  },
  getters: {
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    pendingTodos: (state) => state.todos.filter((todo) => !todo.completed),
    groupedTodos(): Record<string, ToDo[]> {
      return this.todos.reduce((group: Record<string, ToDo[]>, todo: ToDo) => {
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
