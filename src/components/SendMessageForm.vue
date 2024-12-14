<template>
  <div class="col-md-6">
    <h3>Send Us a Message</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label
          for="name"
          class="form-label"
          >Name</label
        >
        <input
          type="text"
          id="name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          v-model="formData.name"
          placeholder="Enter your name"
        />
        <div
          v-if="errors.name"
          class="invalid-feedback"
        >
          {{ errors.name }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="email"
          class="form-label"
          >Email</label
        >
        <input
          type="email"
          id="email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          v-model="formData.email"
          placeholder="Enter your email"
        />
        <div
          v-if="errors.email"
          class="invalid-feedback"
        >
          {{ errors.email }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="message"
          class="form-label"
          >Message</label
        >
        <textarea
          id="message"
          class="form-control"
          rows="4"
          :class="{ 'is-invalid': errors.message }"
          v-model="formData.message"
          placeholder="Enter your message"
        ></textarea>
        <div
          v-if="errors.message"
          class="invalid-feedback"
        >
          {{ errors.message }}
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary w-100"
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
  //   errors.value.email = "Invalid email address.";
  // }
  if (!formData.value.message) {
    errors.value.message = "Message is required.";
  }

  // Check if any errors exist
  return !Object.values(errors.value).some((error) => error);
};
</script>
