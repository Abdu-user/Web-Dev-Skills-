<template>
  <!-- <StickyNav /> -->
  <header class="text-center py-4">
    <!-- :class="" -->
    <h1 class="h2">About Abdurrakhman</h1>
  </header>
  <main class="container my-5">
    <section class="row align-items-center">
      <!-- Image Section -->
      <div class="col-12 col-md-6 text-center mb-4">
        <img
          src="../assets/person.jpg"
          alt="a nice looking person looking towards you"
          class="img-fluid rounded-circle shadow"
        />
      </div>
      <!-- Text Section -->
      <div class="col-12 col-md-6">
        <p class="fs-5">
          My name is Abdurrakhman. I am 21 years old. I am an inspiring individual with a wealth of knowledge and experience to share.
          Passionate about learning and innovation, I strive to make a positive impact in everything I do. I am learning Web development,
          Web design. I write codes on my computers. I use Visual Studio Code to write code effectively, it is essential program for
          creating any computer understanding language.
        </p>
        <!-- <p class="fs-5">
        I am using tech Vue 3, Vue router 4, jest-dom
        </p> -->
      </div>
    </section>
    <hr />
    <section class="row align-items-center mt-5">
      <!-- Images section -->
      <div class="col-12 col-md-6 text-center mb-4 mb-md-0 d-flex flex-wrap gap-3">
        <img
          v-for="(logo, index) in companiesLogos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="w-25 rounded flex-grow-5 flex-shrink-1"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type ImgType = {
  src: string;
  alt: string;
};
import HTMLLogo from "../assets/html-logo.png";
import CSSLogo from "../assets/css-logo.png";
import JSLogo from "../assets/js-logo.png";
import VueLogo from "../assets/logo.png";
const companiesLogos: ImgType[] = [
  {
    src: HTMLLogo,
    alt: "html logo",
  },
  {
    src: CSSLogo,
    alt: "css logo",
  },
  {
    src: JSLogo,
    alt: "Javascript logo",
  },
  {
    src: VueLogo,
    alt: "Vue  logo",
  },
];
</script>

<style scoped>
.flex-grow-5 {
  flex-grow: 0.5;
}
</style>
