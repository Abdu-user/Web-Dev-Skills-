<template>
  <nav
    class="navbar navbar-expand-lg shadow-lg p-3 z-1 col-12 position-sticky opacity-100 px-md-4"
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

    <ToggleThemeButton
      :theme="theme"
      class-name="me-auto"
    />

    <!-- NavLinks -->
    <NavbarLinks
      v-if="!globalState.isMobile"
      className="d-flex flex-row gap-2"
    />

    <!-- v-if="isPhoneSize" -->
    <MobileModalDropDown
      v-if="globalState.isMobile"
      :childClass="`bg-${theme} px-3 pb-3 pt-1 left-3 start-negative ${mobileComputed}`"
    >
      <NavbarLinks />
    </MobileModalDropDown>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import logo from "../../assets/logo.png";
import ToggleThemeButton from "../ToggleThemeButton.vue";
import NavbarLinks from "./NavbarLinks.vue";
import MobileModalDropDown from "../MobileModalDropDown.vue";
import globalState, { ThemeType } from "@/globals/state";

const props = defineProps<{
  theme: ThemeType;
}>();

const containerClass = computed(() => {
  return `navbar-${props.theme} bg-${props.theme}`;
});
const mobileComputed = computed(() => {
  return props.theme === "dark" ? "dark-theme-shadow" : "light-theme-shadow";
});
</script>
<style scoped>
/* //Mobile styles */
::v-deep(.start-negative) {
  border-radius: 0.75rem;
  left: -30px;
  margin-top: 20px;
}
::v-deep(.light-theme-shadow) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.6);
}

::v-deep(.dark-theme-shadow) {
  box-shadow: 0 4px 1px 2px rgba(255, 255, 255, 0.1), 0 1px 1px 2px rgba(255, 255, 255, 0.1);
}

nav {
  top: -1px !important;
}

@media (max-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>
