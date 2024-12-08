<template>
  <nav
    class="navbar navbar-expand-lg shadow-lg"
    :class="containerClass"
  >
    <a
      class="navbar-brand d-flex align-items-center"
      href="#"
    >
      <img
        :src="logo"
        alt="Vue Logo"
        style="height: 40px"
      />

      <span class="ms-2">Vue App</span>
    </a>

    <!-- v-if="isPhoneSize" -->

    <NavbarLinks
      v-if="!isPhoneSize"
      className="d-flex flex-row gap-1"
    />
    <ToggleThemeButton :theme="theme" />
    <MobileModalDropDown
      v-if="isPhoneSize"
      :childClass="`bg-${theme} px-3 pb-3 pt-1 left-3 start-negative mobileLi ${mobileComputed}`"
    >
      <NavbarLinks />
    </MobileModalDropDown>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import logo from "../../assets/logo.png";
import { ThemeType } from "@/App.vue";
import ToggleThemeButton from "../ToggleThemeButton.vue";
import NavbarLinks from "./NavbarLinks.vue";
import MobileModalDropDown from "../MobileModalDropDown.vue";

const props = defineProps<{
  theme: ThemeType;
}>();

const containerClass = computed(() => {
  return `navbar-${props.theme} bg-${props.theme}`;
});
const mobileComputed = computed(() => {
  return props.theme === "dark" ? "dark-theme-shadow" : "light-theme-shadow";
});
const isPhoneSize = ref(window.innerWidth < 576);
</script>
<style scoped>
/* //Mobile styles */
::v-deep(.start-negative) {
  transform: translateY(15px) translateX(-28px);
  border-radius: 0.75rem;
}
::v-deep(.light-theme-shadow) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.6);
}

::v-deep(.dark-theme-shadow) {
  box-shadow: 0 4px 1px 2px rgba(255, 255, 255, 0.1), 0 1px 1px 2px rgba(255, 255, 255, 0.1);
}
::v-deep(.mobileLi li) {
  /* text-decoration: underline; */
  border-bottom: 1px solid gray;
}
::v-deep(.mobileLi li:hover, .mobileLi li:active) {
  /* text-decoration: underline; */
  border-bottom: 1px solid var(--vue-green);
}
/* Optional custom styles */
.navbar {
  padding: 0.75rem;
}

@media (max-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
/* Default position (for larger screens, no changes) */
/* nav .navbar-nav {
  display: flex;
}

nav .navbar-nav .nav-item {
  display: flex;
}

/* Media query for screens smaller than 576px */
/* @media (max-width: 576px) {
  nav .navbar-nav {
    flex-direction: column;
  } */

/* Move ToggleThemeButton to be the second child */
/* nav > .navbar-toggler {
    order: 2;
  }
} */
</style>
<!-- 
nav .navbar-nav .nav-item:nth-child(1) {
  order: 1; /* First child (Home) stays first */
}

nav .navbar-nav .nav-item:nth-child(2) {
  order: 3; /* Second child (About) stays second */
}

nav .navbar-nav .nav-item:nth-child(3) {
  order: 4; /* Third child (Contact) stays third */
}

/* Ensuring ToggleThemeButton is second */
/* nav > .navbar-toggler + ToggleThemeButton {
  order: 2;
} */ -->
