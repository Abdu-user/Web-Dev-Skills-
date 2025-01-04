<template>
  <span v-auto-animate>
    <span v-if="!isOpen && isTextLong">
      {{ shorterText }}
      <span
        role="button"
        tabindex="0"
        @click="toggleOpen"
        class="text-decoration-underline"
      >
        Read More</span
      ></span
    >
    <span v-if="isOpen && isTextLong">
      {{ props.text }}
      <span
        tabindex="0"
        role="button"
        class="text-decoration-underline"
        @click="toggleOpen"
      >
        Read Less
      </span>
    </span>

    <span v-if="!isTextLong">{{ props.text }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  emit("toggleOpenEmit", isOpen.value);
};
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  concat: {
    type: Number,
    default: 70,
  },
  initialOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["toggleOpenEmit"]);
const isOpen = ref(props.initialOpen);
const isTextLong = computed(() => props.text.length > props.concat);

const shorterText = computed(() => {
  return props.text.slice(0, props.concat) + "...";
});
</script>
<style lang="scss" scoped></style>
