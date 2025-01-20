<script setup lang="ts">
import { links } from "@/constants";
import { useProductsStore } from "@/stores/ProductsStore";

const { className } = defineProps({ className: { type: String, default: "" } });

const productsStore = useProductsStore();
const fetchRequiredData = () => {
  if (productsStore.didFetchOnce) return;

  productsStore.fetchProducts();
  productsStore.didFetchOnce = true;
};
</script>

<template>
  <ul
    class="navbar-nav ms-auto"
    :class="className"
    @mouseenter="fetchRequiredData"
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
        @mouseenter="link.name === 'products' ? fetchRequiredData : null"
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
