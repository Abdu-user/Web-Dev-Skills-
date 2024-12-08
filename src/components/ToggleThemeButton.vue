<template>
  <div>
    <div
      role="button"
      class="custom-hover px-4"
      @click="toggleTheme"
    >
      {{ theme }}
    </div>
    <!-- <div
      role="button"
      v-else
      class="custom-hover"
      @click="toggleTheme"
    >
      Dark
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ThemeType } from "@/App.vue";
import { BusType } from "@/globals/bus";
import { inject } from "vue";

const props = defineProps<{ theme: ThemeType }>();
// const emit = defineEmits(["toggleTheme"]);
const bus = inject("$bus") as BusType;
const toggleTheme = () => {
  bus.$emit("toggleTheme");
};
</script>

<style scoped>
/* .btn:hover,
.btn:active {
  background: transparent;
  box-shadow: none;
  border: none;
} */
.custom-hover {
  text-transform: capitalize;
}
.custom-hover:hover {
  color: #28a745; /* Bootstrap's green color */
}
</style>
