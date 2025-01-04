<template>
  <div
    :class="globalStore.theme"
    class="py-5"
    key="contact"
  >
    <div class=" ">
      <h1 class="text-center text-4xl mb-4">Contact Us</h1>
      <div class="container mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center">
        <OurInformation />

        <SendMessage />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from "../components/Footer.vue";
import { useGlobalStore } from "@/stores/GlobalStore";
import OurInformation from "@/components/contact/OurInformation.vue";
import SendMessage from "@/components/contact/SendMessageForm.vue";

// Access the global store
const globalStore = useGlobalStore();
</script>
