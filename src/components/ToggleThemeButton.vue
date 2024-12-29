<template>
  <div
    role="button"
    tabindex="0"
    class="custom-hover position-relative fixed-width"
    :class="className"
    @click="toggleTheme"
    aria-label="Toggle to Light/Dark Theme"
    v-on:keydown.space.enter.prevent=""
    @keyup.space.enter="toggleTheme"
  >
    <!-- @keydown="keyboardCheck($event, toggleTheme, { Space: true })" -->
    <!-- @keydown.space.prevent="toggleTheme" -->
    <transition-group name="fade">
      <i
        role="img"
        v-if="theme === 'dark'"
        class="icon bi bi-moon fs-4"
        aria-label="The moon icon"
      ></i>

      <i
        role="img"
        v-else
        class="icon bi bi-sun fs-4"
        aria-label="The sun icon"
      ></i>
    </transition-group>
  </div>
</template>

<style scoped>
.fixed-width {
  width: 24px;
  height: 36px;
  background: transparent;
  border: none;
}
.icon {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}
/* Transition styles */
.fade-enter-active {
  transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
}
.fade-leave-active {
  transition: all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-leave-to {
  opacity: 0.5;
  transform: translateY(10px);
}
.custom-hover {
  text-transform: capitalize;
}
.custom-hover:hover {
  color: var(--vue-green); /* Bootstrap's green color */
}
</style>

<script setup lang="ts">
// import { BusType } from "@/globals/bus";
// import { inject, ref } from "vue";
// import { keyboardCheck } from "@/utils/utils";
// import { ThemeType } from "@/globals/state";
import { ThemeType, useGlobalStore } from "@/stores/GlobalStore";
const props = defineProps({
  theme: String as () => ThemeType,
  className: { type: String, default: "" },
});
// const bus = inject("$bus") as BusType;
const globalStore = useGlobalStore();
const toggleTheme = () => {
  globalStore.toggleTheme();
};
</script>
