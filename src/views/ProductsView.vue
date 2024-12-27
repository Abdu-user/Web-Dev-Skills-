<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import LoadingError from "@/components/LoadingError.vue";
import { useProductsStore } from "@/stores/ProductsStore";
import { onMounted, toRefs } from "vue";

const productsStore = useProductsStore();
const { products, error, loading, didFetchOnce } = toRefs(productsStore);

onMounted(() => {
  if (!didFetchOnce.value) {
    productsStore.fetchProducts();
    productsStore.setDidFetchOnce(true);
  }
});

const shortTitle = (text: string, length: number = 30) => (text.length > length ? text.slice(0, length) + "..." : text);
</script>

<template>
  <LoadingError
    :error="error"
    :loading="loading"
  />

  <main
    class="mb-5"
    v-if="!loading"
  >
    <h2 class="text-center my-4">Products</h2>
    <div class="d-grid grid-cols-2 products-container d-md-flex flex-md-wrap justify-content-center align-items-center gap-4 mx-2">
      <div
        class="flex-md-grow-1 flex-shrink-1 p-3 custom-shadow rounded"
        v-for="product in products"
        :key="product.id"
        v-auto-animate
      >
        <div
          class="img-container-width aspect-square d-flex justify-content-center align-items-center rounded-5 overflow-hidden bg-white p-2 p-md-4"
        >
          <img
            class="w-100 mx-auto"
            :src="product.image"
            alt="Product Image"
            aria-labelledby="product-title"
          />
        </div>
        <hr />
        <h3
          id="product-title"
          class="mt-3 h5 text-center line-clamp-2 overflow-hidden text-ellipsis"
        >
          {{ shortTitle(product.title, 17) }}
        </h3>
        <p class="d-flex m-0 p-0 flex-column text-lg-start">
          <span>Price: {{ product.price }}$</span>
          <span><strong>Rating:</strong> {{ product.rating.rate }} ⭐</span>
          <span>
            {{ product.rating.count }} reviews
            <i class="bi bi-chat-left-text ms-2"></i>
          </span>
        </p>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
.custom-shadow {
  box-shadow: 2px 2px 6px 7px rgba(80, 80, 80, 0.1);
}

.img-container-width {
  max-height: 240px;
  min-height: 100%;
  min-width: 100%;
  max-width: 240px;
  aspect-ratio: 4 / 5;
  margin: auto;
}

@media (min-width: 576px) {
  .img-container img {
    max-width: 100%;
    max-height: 100%;
  }
}

@media (max-width: 575px) {
  .products-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
