<template>
  <div
    v-if="error"
    class="alert alert-info h-100 d-flex justify-content-center align-items-center"
    role="alert "
  >
    <span class="h1">
      {{ error }}
    </span>
  </div>
  <div
    v-else-if="loading"
    class="alert alert-secondary p-0 m-0 h-100 d-flex justify-content-center align-items-center"
    role="alert"
  >
    <div
      class="spinner-border h1"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "LoadingError",
  props: {
    error: {
      type: String as PropType<string | null>,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
