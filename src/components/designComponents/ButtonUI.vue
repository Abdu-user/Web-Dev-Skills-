<template>
  <button :class="buttonClassName">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
export type ButtonUnionType = "primary" | "secondary";
import { computed } from "vue";

const props = defineProps<{
  className?: string;
  type: ButtonUnionType;
}>();

const buttonClassName = computed(() => {
  let btnClass = props.className || "";
  if (props.type === "primary") {
    btnClass += " bg-primary-color  ";
  } else if (props.type === "secondary") {
    btnClass += " border-primary-color";
  }

  btnClass += "px-3 py-2 rounded-lg ";
  btnClass += `disabled:opacity-50 disabled:cursor-not-allowed
               disabled:bg-gray-400 disabled:text-gray-800 
               transition-all`;
  return btnClass;
});
</script>

<style scoped></style>
