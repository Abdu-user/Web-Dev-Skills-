<template>
  <nav class="flex justify-center items-center gap-3">
    <h1 class="h1 m-3 my-4">To-Do List</h1>

    <div class="flex">
      <DropDownReuse
        button-class=" pb-2 px-1 text-xl leading-none bg-transparent border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-100"
        parent-class="relative z-1 bg-red-400"
        :child-class="`absolute ${globalStore.bgThemeClass} top-2 -left-4 custom-shadow rounded-lg flex flex-col  `"
        :initial-state-boolean="false"
        @return-is-open-state="handleReturnIsOpen"
      >
        <template #icon>
          <div class="flex flex-row items-center justify-center">
            <div class="text-center mt-1">
              Quick
              <!-- <Transition name="spin"> -->
              <span
                class="inline-block"
                :class="isMounted ? '' : isOpen ? 'spin' : 'respin'"
                >⚙️</span
              >
              <!-- </Transition> -->
            </div>
            <div v-auto-animate>
              <ChevronDownIcon v-if="!isOpen" />
              <ChevronUpIcon v-else />
            </div>
          </div>
        </template>
        <div class="w-36 flex flex-col justify-center items-center p-2">
          <RouterLink
            :to="{ name: 'todoSettings' }"
            class="underline p-2"
            :class="computedActiveHoverClass"
            >Go to Settings</RouterLink
          >
          <button
            class="flex items-center cursor-pointer p-2"
            :class="computedActiveHoverClass"
            v-for="quickSetting in quickSettings"
            @click="quickSetting.eventFunction"
          >
            <span class="active:text-vue-color">{{ quickSetting.text }}</span>
            <div class="rounded-full overflow-hidden ml-2 flex justify-center items-center">
              <input
                tabindex="-1"
                type="checkbox"
                class="text-green-600 h-6 w-6 focus:ring-green-500 border-gray-300"
                :checked="quickSetting.isChecked"
              />
            </div>
          </button>
        </div>
      </DropDownReuse>
    </div>
  </nav>
</template>

<script setup lang="ts">
document.title = "To-Do List";
document.querySelector('meta[name="description"]')!.setAttribute("content", "To-Do List");
import { useGlobalStore } from "@/stores/GlobalStore";
import DropDownReuse from "../DropDownReuse.vue";
import { computed, ref } from "vue";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon.vue";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon.vue";
import { watch } from "vue";
import { useToDoStore } from "@/stores/ToDoStore";
const globalStore = useGlobalStore();
const isOpen = ref(false);
const isMounted = ref(true);
const handleReturnIsOpen = (returnedState: boolean) => {
  isOpen.value = returnedState;
};

const todoStore = useToDoStore();
type QuickSetting = {
  text: string;
  isChecked: boolean;
  eventFunction: (arg: any) => void;
};
const quickSettings = computed(() => [
  {
    text: "Hide done",
    isChecked: todoStore.settings.hideCompleted,
    eventFunction() {
      todoStore.settingsActions().toggleHideCompleted();
    },
  },
]);

const computedActiveHoverClass = computed(() => {
  return "hover:outline hover:outline-vue-color hover:outline-1 rounded-lg active:text-vue-color active:outline active:outline-vue-color active:outline-1";
});
watch(isOpen, () => {
  isMounted.value = false;
});
</script>

<style scoped>
.spin {
  animation: spin 0.5s linear forwards;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.respin {
  animation: respin 0.5s linear;
}
@keyframes respin {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
