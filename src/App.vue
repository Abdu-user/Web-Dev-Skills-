<template>
  <div
    class="overflow-auto w-100 vh-100"
    id="window"
    :class="containerClass"
  >
    <NavBar
      :theme="globalState.theme"
      :toggleTheme="toggleTheme"
    />
    <RouterView />
    <!-- <div class="content">
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, reactive } from "vue";
import NavBar from "./components/navbar//Navbar.vue";
import { BusType } from "./globals/bus";
import globalState, { GlobalStateType } from "./globals/state";
import onMountedCalls from "./globals/onMountedCalls";
import { updateIsMobile } from "./globals/utilityFunctions";

onMounted(onMountedCalls);
onUnmounted(() => window.removeEventListener("resize", updateIsMobile));

const saveState = () => {
  localStorage.setItem("state", JSON.stringify(globalState));
};

const toggleTheme = () => {
  globalState.theme = globalState.theme === "dark" ? "light" : "dark";
  saveState();
};

const bus = inject("$bus") as BusType;
bus.$on("toggleTheme", toggleTheme);

const containerClass = computed(() => {
  return `bg-${globalState.theme} text-${globalState.theme === "dark" ? "light" : "black"}`;
});
</script>

<style scoped>
div {
  margin-top: 5px;
}
</style>
