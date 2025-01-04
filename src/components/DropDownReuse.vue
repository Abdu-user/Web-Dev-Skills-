<template>
  <div>
    <ButtonUI
      :type="type"
      :class="buttonClass"
      @click="toggleNavbar"
      aria-controls="navbarContent"
      :aria-expanded="isNavbarCollapsed ? 'false' : 'true'"
      aria-label="Toggle navigation"
    >
      <slot name="icon">
        <span class="navbar-toggler-icon"></span>
      </slot>
    </ButtonUI>
    <Transition :duration="200">
      <div
        v-show="isNavbarCollapsed"
        :class="parentClass"
        @click.self="toggleNavbar"
      >
        <Transition name="drop-down">
          <div
            role="region"
            id="navbarContent"
            v-show="isNavbarCollapsed"
            :class="props.childClass"
          >
            <slot></slot>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonUI, { ButtonUnionType } from "./designComponents/ButtonUI.vue";

const props = defineProps<{
  childClass: string;
  buttonClass?: string;
  parentClass?: string;
  initialStateBoolean?: boolean;
  type: ButtonUnionType;
}>();
const $emits = defineEmits(["returnIsOpenState"]);
const isNavbarCollapsed = ref(false);
if (typeof props.initialStateBoolean === "boolean") {
  isNavbarCollapsed.value = props.initialStateBoolean;
}

const toggleNavbar = () => {
  isNavbarCollapsed.value = !isNavbarCollapsed.value;
  $emits("returnIsOpenState", isNavbarCollapsed.value);
};
</script>

<style scoped>
.drop-down-enter-from,
.drop-down-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-20px); /* Adjust translateY as needed */
}
.drop-down-enter-active,
.drop-down-leave-active {
  transition: all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}
</style>
