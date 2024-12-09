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
      <!-- :class="{ show: !isNavbarCollapsed }" -->
      <!-- class="collapse navbar-collapse" -->
      <div
        role="region"
        id="navbarContent"
        v-show="isNavbarCollapsed"
        class="position-absolute"
        :class="props.childClass"
      >
        <slot></slot>
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
.drop-down-enter-from,
.drop-down-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.drop-down-enter-active,
.drop-down-leave-active {
  transition: all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}
</style>
