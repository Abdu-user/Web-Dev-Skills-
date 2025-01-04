<template>
  <div
    class="home"
    :key="'home'"
  >
    Home
    <button class="border border-secondary-color">secondary</button>
  </div>

  <Footer />
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>
