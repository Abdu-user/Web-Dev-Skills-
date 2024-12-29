<template>
  <div class="container d-flex flex-col justify-center text-center">
    <div
      class="flex flex-col justify-center items-center sticky z-2 top-20 pb-3"
      :class="bgColor"
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
          v-model="toDoText"
          placeholder="Add a new task"
        />
        <datalist id="todo-suggestions">
          <option value="Buy groceries"></option>
          <option value="Complete homework"></option>
          <option value="Walk the dog"></option>
          <option value="Call mom"></option>
        </datalist>
        <button
          @click="addTodo"
          class="bg-green-600 sm:px-4 px-3 py-2 rounded text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-800 transition-all"
          :disabled="isInputEmpty"
        >
          Add
        </button>
      </div>
    </div>

    <!-- To do Array  -->
    <ul class="flex flex-col p-3 rounded-lg">
      <template
        v-for="(groupedToDo, date) in toDoStore.groupedTodos"
        :key="date"
      >
        <!-- Date -->
        <span
          class="mx-auto /bg-color /bg-green-500 /bg-opacity-20 px-2 py-1 rounded-lg"
          :class="`//sticky //top-64`"
          :style="bgDateColor"
        >
          {{ formatDateForDisplay(date) }}
        </span>

        <!-- To Do Element  -->
        <li
          v-for="todo in groupedToDo"
          :key="todo.id"
          class="flex items-start gap-3 py-3 pl-3 pr-0 rounded-lg mb-3"
        >
          <!-- To Do Text -->
          <textarea
            name="toDo text"
            v-if="todo.id === editingTodoId"
            v-model="editingTextArea"
            class="w-full sm:px-4 px-3 py-2 rounded bg-inherit text-inherit custome-shadow"
            ref="editingTextAreaRef"
            @keydown.ctrl.enter="saveTheUpdatedToDoText"
          ></textarea>

          <span
            v-else
            :class="todo.completed && completedToDoClass"
            >{{ todo.text }}</span
          >

          <!-- To Do Buttons -->

          <div
            class="ms-auto text-2xl relative text-white"
            :class="openedOptions === todo.id ? 'z-1' : 'z-0'"
            v-auto-animate="{ duration: 300 }"
          >
            <button
              @click="openOptions(todo.id)"
              class="cursor-pointer px-3 py-1 bg-green-600 rounded-full transition-all duration-700"
              :class="openedOptions === todo.id && openedOptionsButtonStyle"
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
              v-if="openedOptions === todo.id"
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

                <button @click="toDoStore.toggleTodoComplete(todo.id)">
                  <span class="active:text-vue-color">Complete</span>
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
import { useGlobalStore } from "@/stores/GlobalStore";
import { useToDoStore } from "@/stores/ToDoStore";
import { addZeroString, formatDateForDisplay } from "@/utils/utils";
import { computed, nextTick, ref, watch } from "vue";

const toDoText = ref("");
const toDoStore = useToDoStore();
toDoStore.getTodosFromStorage();
const openedOptions = ref<number | null>(1735367445891);

const addTodo = () => {
  console.log(isInputEmpty);
  if (isInputEmpty.value) return;

  toDoStore.addTodo(toDoText.value.trim());
  toDoText.value = "";
};
const isInputEmpty = computed(() => toDoText.value.trim() === "");

const openOptions = (id: number) => {
  if (openedOptions.value === id) {
    openedOptions.value = null;
    return;
  }
  openedOptions.value = id;
};
const openedOptionsButtonStyle = computed(() => {
  if (openedOptions.value === null) return "";

  return "bg-green-800 rounded-bl-none rounded-br-none";
});

const completedToDoClass = computed(() => " line-through  text-gray-500");

const deleteOnConfirm = (todoId: number) => {
  const confirmed = confirm("Are you sure you want to delete this todo?");
  if (confirmed) {
    toDoStore.removeTodo(todoId);
  }
};

const editingTextAreaRef = ref<Record<number, HTMLTextAreaElement>>({});
const editingTodoId = ref<number | null>(null);
const editingTextArea = ref("");
const currentActiveTodoText = ref("");
const editToDoText = (todoId: number, toDoText: string) => {
  const editFunctionality = () => {
    editingTodoId.value = todoId;
    editingTextArea.value = toDoText;
    openedOptions.value = null;
    currentActiveTodoText.value = toDoText;
    nextTick(() => {
      if (editingTextAreaRef.value) {
        console.log(editingTextAreaRef.value[0]);
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
      const confirmed = confirm("Theediting value will not be save! Are you sure you want to continue? ");
      if (confirmed) {
        editFunctionality();
      }
    }
  }
};
const resetEditing = () => {
  editingTodoId.value = null;
  editingTextArea.value = "";
  openedOptions.value = null;
  currentActiveTodoText.value = "";
};
const cancelEditing = () => {
  resetEditing();
};
const saveTheUpdatedToDoText = () => {
  if (!editingTodoId.value) return;
  toDoStore.updateSingleTodo(editingTodoId.value, (todo) => {
    todo.text = editingTextArea.value;
    return todo;
  });
  resetEditing();
};

const globalStore = useGlobalStore();
const textColor = computed(() => {
  return globalStore.theme === "dark" ? "text-white" : "text-black";
});
const bgColor = computed(() => {
  return `bg-${globalStore.theme}`;
});
const bgDateColor = computed(() => {
  return { backgroundColor: globalStore.theme === "dark" ? "#204533" : "#ccefdb" };
});

watch(editingTextArea, (newValue) => {
  // console.log(newValue);
  // console.log(editingTextAreaRef);
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
