<template>
  <div
    v-auto-animate="{ duration: 150 }"
    class="w-full"
  >
    <input
      role="combobox"
      list="datalist-suggestions"
      class="w-full sm:px-4 px-3 py-2 rounded bg-inherit text-inherit"
      v-model="todoText"
      aria-label="Add a new task"
      placeholder="Add a new task"
      type="text"
      @focus="isInputFocused = true"
      @blur="handleBlur"
      ref="todoInputRef"
      @keydown="handleKeydown"
    />
    <ul
      v-if="isInputFocused && computedDataList.length"
      :class="bgColor"
      class="absolute top-14 py-2 px-1 rounded-2xl gap-2 flex flex-col custom-shadow max-h-40 overflow-auto"
      aria-label="datalist"
      @keydown.stop.down.prevent
    >
      <li
        v-for="(option, index) in computedDataList"
        ref="datalistOptionsRef"
        role="option"
        v-on:click=""
        class="px-2 rounded"
        :class="index === pickedDlistIndex ? 'outline outline-orange-400 outline-1' : ''"
        :aria-selected="index === pickedDlistIndex"
        aria-live="assertive"
        @click="handleOptionClick(index)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRefs } from "vue";

import { defineProps } from "vue";

import { useToDoStore } from "@/stores/ToDoStore";
import { nextTick } from "process";

const todoStore = useToDoStore();
const { todoText } = toRefs(todoStore);

const props = defineProps<{
  datalist: string[];
  bgColor: string;
}>();
const $emits = defineEmits(["addTodo"]);

const computedDataList = computed(() => {
  return matchedOptions();
});
const matchedOptions = () => {
  return props.datalist.filter((option) => option.toLowerCase().includes(todoText.value.toLowerCase().trim()));
};
const datalistOptionsRef = ref<Record<number, HTMLLIElement> | null>(null);

const pickedDlistIndex = ref<number | null>(null);

const handleKeydown = (e: KeyboardEvent) => {
  // Handle ArrowDown key
  if (e.key === "ArrowDown") {
    if (pickedDlistIndex.value === null || pickedDlistIndex.value >= computedDataList.value.length - 1) {
      pickedDlistIndex.value = 0;
    } else pickedDlistIndex.value++;

    if (datalistOptionsRef.value !== null) {
      datalistOptionsRef.value[pickedDlistIndex.value].scrollIntoView({ block: "nearest" });
    }
  }
  // Handle ArrowUp key
  else if (e.key === "ArrowUp") {
    if (pickedDlistIndex.value === null || pickedDlistIndex.value <= 0) {
      pickedDlistIndex.value = computedDataList.value.length - 1;
    } else {
      pickedDlistIndex.value--;
    }

    if (datalistOptionsRef.value !== null) {
      datalistOptionsRef.value[pickedDlistIndex.value].scrollIntoView({ block: "nearest" });
    }
  }
  // Handle Control key when input is not focused
  else if (e.key === "Control" && !isInputFocused.value) {
    isInputFocused.value = true;
    pickedDlistIndex.value = null;
  }
  // Handle Escape key when input is focused
  else if (isInputFocused.value && e.key === "Escape") {
    isInputFocused.value = false;
    pickedDlistIndex.value = null;
  }
  // Handle Escape key when input is not focused
  else if (e.key === "Escape" && !isInputFocused.value) {
    todoInputRef.value?.blur();
    isInputFocused.value = false;
    pickedDlistIndex.value = null;
  }
  // Handle Enter key when an option is picked
  else if (pickedDlistIndex.value !== null && pickedDlistIndex.value >= 0 && e.key === "enter") {
    console.log('this is this(pickedDlistIndex.value !==null &&pickedDlistIndex.value >=0&& e.key === "enter") if statement');
  }
  // Handle Enter key to put datalist option value to the todo text
  else if (e.key === "Enter" && pickedDlistIndex.value !== null) {
    putDatalistOptionValueToTheTodoText();
  }
  // Handle Enter key to add a new todo
  else if (e.key === "Enter") {
    $emits("addTodo", todoText);
  }
};
// handleKeydown's last option. Important! Do not separate the watcher further away
watch(computedDataList, () => {
  pickedDlistIndex.value = null;
});

const handleOptionClick = (index: number) => {
  todoText.value = computedDataList.value[index];
  nextTick(() => {
    todoInputRef.value?.focus();
  });
};

const putDatalistOptionValueToTheTodoText = () => {
  if (pickedDlistIndex.value !== null) {
    todoText.value = computedDataList.value[pickedDlistIndex.value];
  } else console.error(`pickedDlistIndex.value !== null; when calling this function you can't have pickedDListIndex.value to have null`);
};
const isInputFocused = ref(false);
const todoInputRef = ref<HTMLInputElement | null>(null);
const setTimeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const handleBlur = () => {
  setTimeoutId.value = setTimeout(() => {
    isInputFocused.value = false;
  }, 20);
};
</script>
