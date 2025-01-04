<template>
  <div class="w-full px-5">
    <h3 class="text-xl font-semibold mb-1">Send Us a Message</h3>
    <form @submit.prevent="submitForm">
      <!-- Name Field -->
      <div
        class="mb-4"
        v-auto-animate
      >
        <label
          for="name"
          class="inline-block mb-1"
          >Name</label
        >
        <input
          type="text"
          id="name"
          class="block w-full p-1.5 text-base font-normal leading-6 text-gray-900 appearance-none bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }"
          v-model="formData.name"
          placeholder="Enter your name"
        />
        <div
          v-if="errors.name"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.name }}
        </div>
      </div>

      <!-- Email Field -->
      <div
        class="mb-4"
        v-auto-animate
      >
        <label
          for="email"
          class="inline-block mb-1"
          >Email</label
        >
        <!-- class="mt-1 p-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" -->
        <input
          type="email"
          id="email"
          class="block w-full p-1.5 text-base font-normal leading-6 text-gray-900 appearance-none bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
          v-model="formData.email"
          placeholder="Enter your email"
        />
        <div
          v-if="errors.email"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.email }}
        </div>
      </div>

      <!-- Message Field -->
      <div
        class="mb-4"
        v-auto-animate
      >
        <label
          for="message"
          class="inline-block mb-1"
          >Message</label
        >
        <textarea
          id="message"
          class="block w-full p-1.5 text-base font-normal leading-6 text-gray-900 appearance-none bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.message }"
          v-model="formData.message"
          placeholder="Enter your message"
        ></textarea>
        <div
          v-if="errors.message"
          class="text-red-500 text-sm mt-1"
        >
          {{ errors.message }}
        </div>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Form data
const formData = ref({
  name: "",
  email: "",
  message: "",
});

// Validation errors
const errors = ref({
  name: "",
  email: "",
  message: "",
});

// Form submission logic
const submitForm = () => {
  // Validate form fields
  if (!validateForm()) return;

  console.log("Form submitted:", formData.value);
  alert("Thank you for contacting us!");
  // Reset form and errors
  formData.value = { name: "", email: "", message: "" };
  errors.value = { name: "", email: "", message: "" };
};

// Form validation logic
const validateForm = () => {
  errors.value = { name: "", email: "", message: "" };

  if (!formData.value.name) {
    errors.value.name = "Name is required.";
  }
  if (!formData.value.email) {
    errors.value.email = "Email is required.";
  }
  // else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
  //   errors.value.email = "Invalid email address."; }

  if (!formData.value.message) {
    errors.value.message = "Message is required.";
  }

  // Check if any errors exist
  return !Object.values(errors.value).some((error) => error);
};
</script>
