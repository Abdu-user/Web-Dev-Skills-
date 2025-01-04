<template>
  <nav
    class="shadow-lg p-3 z-10 w-full sticky opacity-100 px-4 flex gap-1"
    :class="containerClass"
  >
    <!-- Vue logo -->
    <a
      class="flex items-center"
      href="#"
    >
      <img
        :src="logo"
        alt="Vue Logo"
        class="h-10"
      />
      <span class="ml-2">Vue App</span>
    </a>

    <!-- Temporary: Toggle gradient button -->
    <button
      class="mr-3"
      :class="
        globalStore.useGradient
          ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'
          : 'line-through text-gray-500'
      "
      @click="globalStore.toggleUseGradient"
    >
      Gradient
    </button>

    <!-- Toggle Theme button -->
    <ToggleThemeButton :theme="theme" />
    <!-- class-name="ml-auto" -->

    <!-- Start: NavLinks -->
    <NavbarLinks
      v-if="!globalStore.isMobile"
      class="flex flex-row gap-2"
    />

    <!-- v-if="isPhoneSize" -->
    <MobileModalDropDown
      v-if="globalStore.isMobile"
      :childClass="`${globalStore.bgThemeClass} px-3 pb-3 pt-1 absolute flex-col  ${mobileComputed}`"
      :parentClass="`absolute top-[70px] left-0 right-0 bottom-0  z-10 bg-black bg-opacity-50`"
    >
      <NavbarLinks class="flex flex-col" />
    </MobileModalDropDown>
    <!-- End: Navlinks -->
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import logo from "../../assets/logo.png";
import ToggleThemeButton from "../ToggleThemeButton.vue";
import NavbarLinks from "./NavbarLinks.vue";
import MobileModalDropDown from "../MobileModalDropDown.vue";
import { ThemeType, useGlobalStore } from "@/stores/GlobalStore";

const props = defineProps<{
  theme: ThemeType;
}>();
const globalStore = useGlobalStore();

const containerClass = computed(() => {
  return `navbar-${props.theme} ${globalStore.bgThemeClass}`;
});
const mobileComputed = computed(() => {
  return props.theme === "dark" ? "dark-theme-shadow" : "light-theme-shadow";
});
</script>

<style scoped>
/* //Mobile styles */
::v-deep(.childClass) {
  border-radius: 0.75rem;
  max-width: 200px;
  right: 7px;
  text-align: center;
}
::v-deep(.parentClass) {
  left: 0;
  top: 82px;
  width: 100vw;
  height: calc(100vh - 82px);
}
::v-deep(.light-theme-shadow) {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.6);
}

::v-deep(.dark-theme-shadow) {
  box-shadow: 0 4px 1px 2px rgba(255, 255, 255, 0.1), 0 1px 1px 2px rgba(255, 255, 255, 0.1);
}

nav {
  top: -1px !important;
  left: 0 !important;
}

@media (max-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>
