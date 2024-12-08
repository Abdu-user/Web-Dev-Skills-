<script setup lang="ts">
const { className } = defineProps({ className: { type: String, default: "" } });
</script>

<template>
  <ul
    class="navbar-nav ms-auto"
    :class="className"
  >
    <li class="nav-item">
      <RouterLink
        role="link"
        class="nav-link"
        :to="{ name: 'home' }"
        >Home</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
        role="link"
        class="nav-link"
        :to="{ name: 'about' }"
        >About</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
        role="link"
        class="nav-link"
        :to="{ name: 'contact' }"
        >Contact</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped>
a:hover,
button:hover {
  color: #28a745; /* Bootstrap's green color */
}
</style>
