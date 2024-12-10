<script setup lang="ts">
const { className } = defineProps({ className: { type: String, default: "" } });
type LinkType = {
  name: string;
};
const links: LinkType[] = [{ name: "home" }, { name: "about" }, { name: "contact" }];
</script>

<template>
  <ul
    class="navbar-nav ms-auto"
    :class="className"
  >
    <li
      class="nav-item"
      v-for="link in links"
    >
      <RouterLink
        role="link"
        class="nav-link text-capitalize"
        :to="{ name: link.name }"
        active-class="activeLink"
        :key="link.name"
        >{{ link.name }}</RouterLink
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
@media (max-width: 575px) {
  li:has(a.activeLink):hover a.activeLink {
    border-color: var(--vue-green);
    /* border-bottom: 1px solid var(--vue-green); */
  }
  .activeLink {
    border-bottom: 1px solid gray;
  }
}
@media (min-width: 576px) {
  .activeLink {
    text-decoration: underline;
  }
}
</style>
