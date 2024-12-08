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
        active-class="activeLink"
        >Home</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
        role="link"
        class="nav-link"
        :to="{ name: 'about' }"
        active-class="activeLink"
        >About</RouterLink
      >
    </li>
    <li class="nav-item">
      <RouterLink
        role="link"
        class="nav-link"
        :to="{ name: 'contact' }"
        active-class="activeLink"
        >Contact</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped>
a:hover,
button:hover {
  color: var(--vue-green); /* Bootstrap's green color */
}
.activeLink {
  font-weight: bold;
  font-size: 0.95rem;
}
@media (min-width: 576px) {
  .activeLink {
    text-decoration: underline;
  }
}
</style>
