<template>
  <transition-group
    name="fade"
    tag="div"
    class="m-2 fixed-width position-relative d-flex justify-content-center align-items-center"
    :class="className"
  >
    <div
      v-if="theme === 'dark'"
      key="dark"
      role="button"
      class="custom-hover theme-toggler"
      tabindex="0"
      @click="toggleTheme"
      aria-label="Toggle to Light Theme"
    >
      <i class="bi bi-moon fs-4"></i>
    </div>
    <div
      v-else
      key="light"
      role="button"
      class="custom-hover theme-toggler"
      tabindex="0"
      @click="toggleTheme"
      aria-label="Toggle to Dark Theme"
    >
      <i class="bi bi-sun fs-4"></i>
    </div>
  </transition-group>
</template>

<style scoped>
.fixed-width {
  width: 24px;
}
/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.custom-hover {
  position: absolute;
  text-transform: capitalize;
}
.custom-hover:hover {
  color: var(--vue-green); /* Bootstrap's green color */
}
</style>

<script setup lang="ts">
import { ThemeType } from "@/App.vue";
import { BusType } from "@/globals/bus";
import { inject } from "vue";

const props = defineProps({
  theme: String as () => ThemeType,
  className: { type: String, default: "" },
});
// const emit = defineEmits(["toggleTheme"]);
const bus = inject("$bus") as BusType;
const toggleTheme = () => {
  bus.$emit("toggleTheme");
};
</script>
