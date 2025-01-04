<script setup lang="ts">
import { useProductsStore } from "@/stores/ProductsStore";

const { className } = defineProps({ className: { type: String, default: "" } });
type LinkType = {
  name: string;
};
const links: LinkType[] = [{ name: "home" }, { name: "products" }, { name: "todo" }, { name: "about" }, { name: "contact" }];

const productsStore = useProductsStore();
const fetchRequiredData = () => {
  if (productsStore.didFetchOnce) return;

  productsStore.fetchProducts();
  productsStore.didFetchOnce = true;
};
</script>

<template>
  <!-- :class="'navbar-nav ms-auto'" -->
  <ul
    class="flex justify-center items-center ml-auto pl-0 mb-0 list-none"
    :class="className"
    @mouseenter="fetchRequiredData"
  >
    <li
      :class="'nav-item'"
      v-for="link in links"
    >
      <RouterLink
        role="link"
        class="uppercase font-medium"
        :to="{ name: link.name }"
        active-class=" border-b-2  border-vue-color  text-vue-color"
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
