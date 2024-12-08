<script setup lang="ts"></script>

<template>
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <RouterLink
        class="nav-link"
        :to="{ name: 'home' }"
        >Home</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
        class="nav-link"
        :to="{ name: 'about' }"
        >About</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
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
