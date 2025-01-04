<template>
  <div
    :class="globalStore.theme"
    class="py-5"
    key="contact"
  >
    <div class="container">
      <h1 class="text-center mb-4">Contact Us</h1>
      <div class="row">
        <!-- Contact Information -->
        <OurInformation />

        <!-- Contact Form -->
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
