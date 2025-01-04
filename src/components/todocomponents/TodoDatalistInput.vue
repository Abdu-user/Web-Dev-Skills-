<template>
  <div
    v-auto-animate="{ duration: 150 }"
    class="w-full"
  >
    <input
      role="combobox"
      list="datalist-suggestions"
      class="w-full sm:px-4 pr-3 pl-2 py-2 rounded bg-inherit text-inherit"
      v-model="todoText"
      aria-label="Add a new task"
      placeholder="Add a new task"
      type="text"
      @focus="isDatalistOpen = true"
      @blur="handleBlur"
      ref="todoInputRef"
      @keydown="handleKeydown"
    />
    <ul
      v-if="isDatalistOpen && computedDataList.length"
      :class="globalStore.bgThemeClass"
      class="absolute top-14 py-2 px-1 rounded-2xl flex flex-col custom-shadow max-h-52 overflow-auto md:scrollbar-thin md:scrollbar-thumb-gray-500 md:scrollbar-track-gray-100"
      aria-label="datalist"
      @keydown.stop.down.prevent
    >
      <li
        v-for="(option, index) in computedDataList"
        ref="datalistOptionsRef"
        role="option"
        v-on:click=""
        class="px-2 rounded cursor-pointer hover:outline hover:outline-orange-400 hover:outline-1"
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
import { useGlobalStore } from "@/stores/GlobalStore";

const globalStore = useGlobalStore();

const todoStore = useToDoStore();
const { todoText } = toRefs(todoStore);

const props = defineProps<{
  datalist: string[];
}>();
const $emits = defineEmits(["addTodo"]);

const computedDataList = computed(() => {
  return matchedOptions();
});
const matchedOptions = () => {
  const trimmedTodoText = todoText.value.toLowerCase().trim();

  return props.datalist.filter((option) => {
    const optionLowerCase = option.toLowerCase();

    // Skip exact matches
    if (optionLowerCase === trimmedTodoText) {
      return false;
    }

    // Return options that partially match
    return optionLowerCase.includes(trimmedTodoText);
  });
};

const datalistOptionsRef = ref<Record<number, HTMLLIElement> | null>(null);

const pickedDlistIndex = ref<number | null>(null);

/// <---
const handleKeydown = (e: KeyboardEvent) => {
  const { key } = e;
  const optionsLength = computedDataList.value.length;

  if (key === "ArrowDown" || key === "ArrowUp") {
    if (!optionsLength) return;
    const direction = key === "ArrowDown" ? 1 : -1;

    if (pickedDlistIndex.value === null) {
      pickedDlistIndex.value = key === "ArrowDown" ? 0 : optionsLength - 1;
    } else {
      pickedDlistIndex.value = (pickedDlistIndex.value + direction + optionsLength) % optionsLength;
    }

    const selectedOption = datalistOptionsRef.value?.[pickedDlistIndex.value];
    selectedOption?.scrollIntoView({ block: "nearest" });
  } else if (key === "Control" && !isDatalistOpen.value) {
    isDatalistOpen.value = true;
    pickedDlistIndex.value = null;
  } else if (key === "Escape") {
    if (pickedDlistIndex.value === null && isDatalistOpen.value === false) {
      todoInputRef.value?.blur();
    } else {
      isDatalistOpen.value = false;
      pickedDlistIndex.value = null;
    }
  } else if (key === "Enter") {
    if (pickedDlistIndex.value !== null) {
      putDatalistOptionValueToTheTodoText();
    } else {
      $emits("addTodo", todoText);
    }
  }
};
// handleKeydown's last option. Important! Do not separate the watcher further away
watch(computedDataList, () => {
  pickedDlistIndex.value = null;
});
// --->

const handleOptionClick = (index: number) => {
  console.log(index, computedDataList.value[index]);
  todoText.value = computedDataList.value[index];

  setTimeoutId.value && clearTimeout(setTimeoutId.value);
  nextTick(() => {
    todoInputRef.value?.focus();
    isDatalistOpen.value = true;
  });
};

const putDatalistOptionValueToTheTodoText = () => {
  if (pickedDlistIndex.value !== null) {
    todoText.value = computedDataList.value[pickedDlistIndex.value];
  } else console.error(`pickedDlistIndex.value !== null; when calling this function you can't have pickedDListIndex.value to have null`);
};
const isDatalistOpen = ref(false);
const todoInputRef = ref<HTMLInputElement | null>(null);
const setTimeoutId = ref<ReturnType<typeof setTimeout> | null>(null);
const handleBlur = () => {
  setTimeoutId.value = setTimeout(() => {
    isDatalistOpen.value = false;
  }, 140);
};
</script>
