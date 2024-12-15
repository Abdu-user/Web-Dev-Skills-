<template>
  <div
    class="overflow-auto w-100 vh-100 d-flex flex-column"
    id="window"
    :class="containerClass"
    v-auto-animate="{ duration: 200 }"
  >
    <NavBar :theme="globalStore.theme" />

    <RouterView />
    <div id="innerModals"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import NavBar from "./components/navbar//Navbar.vue";
import { useGlobalStore } from "./stores/GlobalStore";

const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.getState();
  globalStore.updateIsMobile();
  window.addEventListener("resize", globalStore.updateIsMobile);
});
onUnmounted(() => {
  window.removeEventListener("resize", globalStore.updateIsMobile);
});

const containerClass = computed(() => {
  return `bg-${globalStore.theme} text-${globalStore.theme === "dark" ? "light" : "black"}`;
});
</script>

<style scoped>
div {
  margin-top: 5px;
}
</style>
