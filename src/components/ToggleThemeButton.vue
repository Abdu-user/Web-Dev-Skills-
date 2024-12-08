<template>
  <div
    role="button"
    tabindex="0"
    class="custom-hover position-relative fixed-width"
    :class="className"
    @click="toggleTheme"
    @keyup="keyboardCheck($event, toggleTheme, { Space: true })"
    aria-label="Toggle to Light/Dark Theme"
  >
    <transition-group name="fade">
      <i
        v-if="theme === 'dark'"
        class="icon bi bi-moon fs-4"
      ></i>

      <i
        v-else
        class="icon bi bi-sun fs-4"
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
import { ThemeType } from "@/App.vue";
import { BusType } from "@/globals/bus";
import { inject, ref } from "vue";
import { keyboardCheck } from "@/utils/utils";
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
