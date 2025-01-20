<template>
  <div class="container d-flex flex-col justify-center text-center">
    <div
      class="flex flex-col justify-center items-center sticky z-2 top-20 pb-3 rounded-lg sm:px-4"
      :class="globalStore.bgThemeClass"
    >
      <!-- To Do settings -->

      <TodoNavbarSettings />
      <!-- Create a ToDo -->
      <div class="p-3 flex justify-center items-center gap-3 w-full max-w-3xl shadow-md rounded-2xl">
        <!-- Input has a custom datalist -->
        <TodoDatalistInput
          :datalist="datalist"
          @addTodo="addTodo"
        />

        <button
          @click="addTodo"
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
      v-auto-animate
    >
      <template
        v-for="(groupedToDo, date) in toDoStore.groupedTodos"
        :key="date"
      >
        <!-- Date -->
        <h4
          class="mx-auto /bg-color /bg-green-500 /bg-opacity-20 px-2 py-1 rounded-lg"
          :aria-label="`Tasks for ${formatDateForDisplay(date)}`"
        >
          {{ formatDateForDisplay(date) }}
        </h4>

        <!-- To Do Element -->
        <li
          v-for="todo in groupedToDo"
          :key="todo.id"
          class="flex items-start gap-3 py-3 pl-3 pr-0 rounded-lg mb-3"
          :aria-labelledby="todo.id + 'listItemText'"
          role="listitem"
        >
          <!-- To Do Text  if Editing -->
          <textarea
            name="toDo text"
            v-if="todo.id === editingTodoId"
            :id="todo.id + 'listItemText'"
            v-model="editingTextArea"
            class="w-full sm:px-4 px-3 py-2 rounded bg-inherit text-inherit custom-shadow"
            ref="editingTextAreaRef"
            @keydown.enter="saveTheUpdatedToDoText"
            :aria-label="editingTextArea"
          ></textarea>

          <!-- To Do Text if not editing -->
          <span
            v-else
            :id="todo.id + 'listItemText'"
            :class="todo.completed && completedToDoClass"
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
              @click="openOptions(todo.id)"
              class="cursor-pointer px-3 py-1 bg-green-600 rounded-full transition-all duration-700"
              :aria-expanded="openedOptionsId === todo.id"
              aria-label="Open options menu for this to-do"
              :class="openedOptionsId === todo.id && openedOptionsButtonStyle"
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
                <button @click="saveTheUpdatedToDoText">
                  <span class="active:text-vue-color">Save</span>
                </button>
                <button @click="cancelEditing">
                  <span class="active:text-vue-color">Cancel</span>
                </button>
              </template>
              <!-- default buttons -->
              <template v-else>
                <button @click="editToDoText(todo.id, todo.text)">
                  <span class="active:text-vue-color">Edit</span>
                </button>

                <button
                  @click="toDoStore.toggleTodoComplete(todo.id)"
                  class="flex items-center cursor-pointer"
                  :aria-labelledby="todo.id + 'span'"
                >
                  <span
                    :id="todo.id + 'span'"
                    class="active:text-vue-color"
                    >Complete</span
                  >
                  <div class="rounded-full overflow-hidden ml-2 flex justify-center items-center">
                    <input
                      tabindex="-1"
                      type="checkbox"
                      class="text-green-600 h-6 w-6 focus:ring-green-500 border-gray-300"
                      :checked="todo.completed"
                      aria-label="Mark as complete"
                    />
                  </div>
                </button>

                <button @click="deleteOnConfirm(todo.id)">
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
import TodoDatalistInput from "@/components/todocomponents/TodoDatalistInput.vue";
import TodoNavbarSettings from "@/components/todocomponents/TodoNavbarSettings.vue";
import { useGlobalStore } from "@/stores/GlobalStore";
import { useToDoStore } from "@/stores/ToDoStore";
import { addZeroString, formatDateForDisplay } from "@/utils/utils";
import { computed, nextTick, ref, toRefs, watch } from "vue";

// State variables
const toDoStore = useToDoStore();
const { todoText, datalist } = toRefs(toDoStore);
toDoStore.getTodosFromStorage();
const openedOptionsId = ref<number | null>(1735367445891);

// Add a new todo
const addTodo = () => {
  if (isInputEmpty.value) return;

  toDoStore.addTodo(todoText.value.trim());
};

// input Datalist

const isInputEmpty = computed(() => todoText.value.trim() === "");

// Computed properties
const openedOptionsButtonStyle = computed(() => {
  if (openedOptionsId.value === null) return "";
  return "bg-green-800 rounded-bl-none rounded-br-none";
});
const completedToDoClass = computed(() => " line-through  text-gray-500");
const textColor = computed(() => {
  return globalStore.theme === "dark" ? "text-white" : "text-black";
});
const bgDateColor = computed(() => {
  return { backgroundColor: globalStore.theme === "dark" ? "#204533" : "#ccefdb" };
});

// Open options menu
const openOptions = (id: number) => {
  if (openedOptionsId.value === id) {
    openedOptionsId.value = null;
    return;
  }
  openedOptionsId.value = id;
};

// Delete a todo with confirmation
const deleteOnConfirm = (todoId: number) => {
  const confirmed = confirm("Are you sure you want to delete this todo?");
  if (confirmed) {
    toDoStore.removeTodo(todoId);
  }
};

// Editing functionality
const editingTextAreaRef = ref<Record<number, HTMLTextAreaElement>>({});
const editingTodoId = ref<number | null>(null);
const editingTextArea = ref("");
const currentActiveTodoText = ref("");
const editToDoText = (todoId: number, todoText: string) => {
  const editFunctionality = () => {
    editingTodoId.value = todoId;
    editingTextArea.value = todoText;
    openedOptionsId.value = null;
    currentActiveTodoText.value = todoText;
    nextTick(() => {
      if (editingTextAreaRef.value) {
        editingTextAreaRef.value[0].focus();
      }
    });
  };
  if (editingTodoId.value === null) {
    editFunctionality();
  } else {
    if (currentActiveTodoText.value === editingTextArea.value) {
      editFunctionality();
    } else {
      const confirmed = confirm("The editing value will not be save! Are you sure you want to continue? ");
      if (confirmed) {
        editFunctionality();
      }
    }
  }
};

// Reset editing state
const resetEditing = () => {
  editingTodoId.value = null;
  editingTextArea.value = "";
  openedOptionsId.value = null;
  currentActiveTodoText.value = "";
};

// Cancel editing
const cancelEditing = () => {
  resetEditing();
};

// Save the updated todo text
const saveTheUpdatedToDoText = () => {
  if (!editingTodoId.value) return;
  toDoStore.updateSingleTodo(editingTodoId.value, (todo) => {
    todo.text = editingTextArea.value;
    return todo;
  });
  resetEditing();
};

// Global store
const globalStore = useGlobalStore();

watch(editingTextArea, (newValue) => {
  // console.log(newValue);
  // console.log(editingTextAreaRef);
  // test
});
// watch(computedDataList, async () => {
//   await nextTick();
//   console.log(datalistOptionsRef.value);
// });
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
</style>
