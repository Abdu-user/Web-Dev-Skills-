<template>
  <div class="position-relative">
    <button
      class="navbar-toggler"
      type="button"
      @click="toggleNavbar"
      aria-controls="navbarContent"
      :aria-expanded="isNavbarCollapsed ? 'false' : 'true'"
      aria-label="Toggle navigation"
    >
      <slot name="icon">
        <span class="navbar-toggler-icon"></span>
      </slot>
    </button>
    <Transition name="drop-down">
      <div
        class="collapse navbar-collapse"
        :class="{ show: !isNavbarCollapsed }"
        id="navbarContent"
        v-show="!isNavbarCollapsed"
      >
        <div
          class="position-absolute"
          :class="props.childClass"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  childClass: { type: String },
});
const isNavbarCollapsed = ref(false);

const toggleNavbar = () => {
  isNavbarCollapsed.value = !isNavbarCollapsed.value;
};
</script>

<style scoped>
.drop-down-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.drop-down-enter-active {
  transition: all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715);
}
</style>
