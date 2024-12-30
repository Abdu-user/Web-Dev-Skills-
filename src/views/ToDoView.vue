<template>
  <div class="container d-flex flex-col justify-center text-center">
    <div
      class="flex flex-col justify-center items-center sticky z-2 top-20 pb-3"
      :class="backgroundColor"
    >
      <!-- To Do settings -->
      <nav class="flex justify-center items-center gap-3">
        <h1 class="h1 m-3 my-4">To-Do List</h1>
      </nav>

      <!-- Create a ToDo -->
      <div class="p-3 flex justify-center items-center gap-3 w-full max-w-3xl shadow-md rounded-2xl">
        <input
          list="todo-suggestions"
          class="w-full sm:px-4 px-3 py-2 rounded bg-inherit text-inherit"
          v-model="newTodoText"
          aria-label="Add a new task"
          aria-describedby="todo-help-text"
          placeholder="Add a new task"
          type="text"
        />
        <small
          id="todo-help-text"
          class="sr-only"
          >Add a new task</small
        >
        <datalist id="todo-suggestions">
          <option value="Buy groceries"></option>
          <option value="Complete homework"></option>
          <option value="Walk the dog"></option>
          <option value="Call mom"></option>
        </datalist>
        <button
          @click="addNewTodo"
          class="bg-green-600 sm:px-4 px-3 py-2 rounded text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 transition-all"
          :disabled="isInputEmpty"
          aria-label="Add this task"
        >
          Add
        </button>
      </div>
    </div>

    <!-- To do Array -->
    <ul
      class="flex flex-col p-3 rounded-lg"
      role="list"
      aria-live="polite"
      aria-label="To-do list items"
    >
      <template
        v-for="(groupedTodoItems, date) in todoStore.groupedTodos"
        :key="date"
      >
        <!-- Date -->
        <span
          role="heading"
          class="mx-auto /bg-color /bg-green-500 /bg-opacity-20 px-2 py-1 rounded-lg"
          :style="dateBackgroundColor"
          :aria-label="`Tasks for ${formatDateForDisplay(date)}`"
        >
          {{ formatDateForDisplay(date) }}
        </span>

        <!-- To Do Element -->
        <li
          v-for="todo in groupedTodoItems"
          :key="todo.id"
          class="flex items-start gap-3 py-3 pl-3 pr-0 rounded-lg mb-3"
          :aria-labelledby="todo.id + 'listItemText'"
          role="listitem"
        >
          <!-- To Do Text  if Editing -->
          <textarea
            name="todo text"
            v-if="todo.id === editingTodoId"
            :id="todo.id + 'listItemText'"
            v-model="todoEditText"
            class="w-full sm:px-4 px-3 py-2 rounded bg-inherit text-inherit custome-shadow"
            ref="todoEditTextAreaRef"
            @keydown.ctrl.enter="saveUpdatedTodoText"
            :aria-label="todoEditText"
          ></textarea>

          <!-- To Do Text if not editing -->
          <span
            v-else
            :id="todo.id + 'listItemText'"
            :class="todo.completed && completedTodoClass"
            :aria-label="todo.completed ? 'Completed: ' + todo.text : todo.text"
          >
            {{ todo.text }}
          </span>

          <!-- To Do Buttons -->
          <div
            class="ms-auto text-2xl relative text-white"
            :class="openedOptionsId === todo.id ? 'z-1' : 'z-0'"
            v-auto-animate="{ duration: 300 }"
          >
            <button
              @click="toggleOptions(todo.id)"
              class="cursor-pointer px-3 py-1 bg-green-600 rounded-full transition-all duration-700"
              :aria-expanded="openedOptionsId === todo.id"
              aria-label="Open options menu for this to-do"
              title="Open options menu for this to-do"
            >
              ⋮
            </button>

            <!-- Time -->
            <div
              class="absolute text-sm mt-2"
              :class="textColor"
              v-if="todo.createdDate"
            >
              {{ addZeroString(todo.createdDate.getHours()) + ":" + addZeroString(todo.createdDate.getMinutes()) }}
            </div>

            <div
              class="absolute flex flex-col right-0 text-base bg-green-800 p-3 rounded-3xl rounded-tr-none gap-3"
              v-if="openedOptionsId === todo.id"
            >
              <!-- if editing buttons -->
              <template v-if="todo.id === editingTodoId">
                <button @click="saveUpdatedTodoText">
                  <span class="active:text-vue-color">Save</span>
                </button>
                <button @click="cancelEditTodo">
                  <span class="active:text-vue-color">Cancel</span>
                </button>
              </template>
              <!-- default buttons -->
              <template v-else>
                <button @click="startEditTodoText(todo.id, todo.text)">
                  <span class="active:text-vue-color">Edit</span>
                </button>

                <label class="flex items-center cursor-pointer">
                  <span class="active:text-vue-color">Complete</span>
                  <div class="rounded-full overflow-hidden ml-2 flex justify-center items-center">
                    <input
                      type="checkbox"
                      class="text-green-600 h-6 w-6 focus:ring-green-500 border-gray-300"
                      :checked="todo.completed"
                      @change="todoStore.toggleTodoComplete(todo.id)"
                      aria-label="Mark as complete"
                    />
                  </div>
                </label>

                <button @click="deleteTodo(todo.id)">
                  <span class="active:text-vue-color">Delete</span>
                </button>
              </template>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useGlobalStore } from "@/stores/GlobalStore";
import { useToDoStore } from "@/stores/ToDoStore";
import { addZeroString, formatDateForDisplay } from "@/utils/utils";
import { computed, nextTick, ref, watch } from "vue";

// Reactive variables
const newTodoText = ref("");
const todoStore = useToDoStore();
todoStore.getTodosFromStorage();
const openedOptionsId = ref<number | null>(1735367445891);

// Computed properties
const isInputEmpty = computed(() => newTodoText.value.trim() === "");
const completedTodoClass = computed(() => " line-through text-gray-500");
const textColor = computed(() => {
  return useGlobalStore().theme === "dark" ? "text-white" : "text-black";
});
const backgroundColor = computed(() => {
  return `bg-${useGlobalStore().theme}`;
});
const dateBackgroundColor = computed(() => {
  return { backgroundColor: useGlobalStore().theme === "dark" ? "#204533" : "#ccefdb" };
});

// Methods
const addNewTodo = () => {
  if (isInputEmpty.value) return;
  todoStore.addTodo(newTodoText.value.trim());
  newTodoText.value = "";
};

const toggleOptions = (id: number) => {
  openedOptionsId.value = openedOptionsId.value === id ? null : id;
};

const deleteTodo = (todoId: number) => {
  const confirmed = confirm("Are you sure you want to delete this todo?");
  if (confirmed) {
    todoStore.removeTodo(todoId);
  }
};

const todoEditTextAreaRef = ref<Record<number, HTMLTextAreaElement>>({});
const editingTodoId = ref<number | null>(null);
const todoEditText = ref("");
const currentActiveTodoText = ref("");

// Start editing a todo item
const startEditTodoText = (todoId: number, todoText: string) => {
  const initializeEditing = () => {
    editingTodoId.value = todoId;
    todoEditText.value = todoText;
    openedOptionsId.value = null;
    currentActiveTodoText.value = todoText;
    nextTick(() => {
      if (todoEditTextAreaRef.value) {
        todoEditTextAreaRef.value[0].focus();
      }
    });
  };

  if (editingTodoId.value === null || currentActiveTodoText.value === todoEditText.value) {
    initializeEditing();
  } else {
    const confirmed = confirm("The editing value will not be saved! Are you sure you want to continue?");
    if (confirmed) {
      initializeEditing();
    }
  }
};

// Reset editing state
const resetEditing = () => {
  editingTodoId.value = null;
  todoEditText.value = "";
  openedOptionsId.value = null;
  currentActiveTodoText.value = "";
};

// Cancel editing
const cancelEditTodo = () => {
  resetEditing();
};

// Save updated todo text
const saveUpdatedTodoText = () => {
  if (!editingTodoId.value) return;
  todoStore.updateSingleTodo(editingTodoId.value, (todo) => {
    todo.text = todoEditText.value;
    return todo;
  });
  resetEditing();
};

// Watchers
watch(todoEditText, (newValue) => {
  // console.log(newValue);
  // console.log(todoEditTextAreaRef);
  // test
});
</script>

<style scoped>
.container,
nav,
h1,
div,
input,
datalist,
option,
button,
ul,
li,
span {
  /* border: 1px solid #7d7d7d; */
  /* box-shadow: 0 0 0 1px rgb(142, 142, 142); */
  opacity: 1;
}
.custome-shadow {
  box-shadow: 2px 2px 10px 4px gray;
}
</style>
