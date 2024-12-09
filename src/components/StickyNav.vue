<script setup lang="ts">
defineProps({
  href: { type: String, default: "#" },
  className: { type: String, default: "top-0" },
});
import VueLogo from "../assets/logo.png";
</script>

<template>
  <!-- :class="" -->
  <nav
    ref="nav"
    class="position-sticky col-12 bg-inherit opacity-92 m-0 p-0"
    :class="className"
  >
    <a
      class="navbar-brand d-flex align-items-center"
      href="#"
    >
      <img
        :src="VueLogo"
        alt="Vue Logo"
        style="height: 40px"
      />

      <span class="ms-2">Vue App</span>
    </a>
  </nav>
</template>

<style scoped>
.img-fluid {
  height: 60px;
}

.bg-inherit {
  background-color: inherit;
}
.opacity-92 {
  opacity: 0.92;
}
a {
  display: inline-block;
}
nav {
  margin: 0;
}
</style>
