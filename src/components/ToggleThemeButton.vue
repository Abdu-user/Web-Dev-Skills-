<template>
  <button
    class="grid justify-center items-center hover:text-vue-color relative px-1 rounded"
    :class="className"
    @click="toggleTheme"
    style="grid-template-areas: 'icon'"
    aria-label="Toggle to Light/Dark Theme"
  >
    <transition name="fade">
      <i
        role="img"
        v-if="theme === 'dark'"
        class="inline-block bi bi-moon text-xl"
        style="grid-area: icon"
        aria-label="The moon icon"
      ></i>

      <i
        role="img"
        v-else
        style="grid-area: icon"
        class="inline-block bi bi-sun text-xl"
        aria-label="The sun icon"
      ></i>
    </transition>
  </button>
</template>

<style scoped>
/* Transition styles */
.fade-enter-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.fade-enter-from {
  opacity: 0.5;
  transform: translateY(-40px);
  /* rotate: 180deg; */
}
.fade-leave-to {
  opacity: 0.5;
  transform: translateY(20px);
  /* rotate: 180deg; */
}
</style>

<script setup lang="ts">
import { ThemeType, useGlobalStore } from "@/stores/GlobalStore";
const props = defineProps({
  theme: String as () => ThemeType,
  className: { type: String, default: "" },
});
const globalStore = useGlobalStore();
const toggleTheme = () => {
  globalStore.toggleTheme();
};
</script>
