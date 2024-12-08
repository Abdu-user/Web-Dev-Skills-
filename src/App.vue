<template>
  <div
    class="container1"
    :class="containerClass"
  >
    <NavBar
      :theme="state.theme"
      :toggleTheme="toggleTheme"
    />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
export type ThemeType = "dark" | "light";
export type StateType = {
  theme: ThemeType;
};

import { computed, inject, onMounted, reactive } from "vue";
import NavBar from "./components/navbar//Navbar.vue";
import { BusType } from "./globals/bus";

const defaultState: StateType = {
  theme: "light",
};
const getState = () => {
  const savedState = localStorage.getItem("state");
  if (savedState) {
    const parsedState: StateType = JSON.parse(savedState);
    state.theme = parsedState.theme;
  }
};
const saveState = () => {
  localStorage.setItem("state", JSON.stringify(state));
};
onMounted(getState);
const state = reactive<StateType>(defaultState);

const toggleTheme = () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  saveState();
};
const bus = inject("$bus") as BusType;
bus.$on("toggleTheme", toggleTheme);

const containerClass = computed(() => {
  return `bg-${state.theme} text-${state.theme === "dark" ? "light" : "black"}`;
});
</script>

<style scoped>
.container1 {
  width: 100vw;
  height: 100vh;
}
</style>
