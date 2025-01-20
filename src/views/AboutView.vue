<template>
  <div key="about">
    <!-- <StickyNav /> -->
    <header class="text-center pt-4">
      <!-- :class="" -->
      <h1 class="text-4xl font-bold">
        About
        <span class="text-green-600"> Abdurrakhman </span>
      </h1>
    </header>
    <main class="container my-5">
      <section class="row align-items-center justify-content-evenly mb-4">
        <!-- Image Section -->
        <div class="col-12 col-md-4 text-center mb-4">
          <img
            src="../assets/person.jpg"
            alt="a nice looking person looking towards you"
            class="img-fluid rounded-circle shadow"
          />
        </div>
        <!-- Text Section -->
        <div class="col-12 col-md-7 px-4 px-md-0">
          <p class="fs-5">
            My name is Abdurrakhman. I am 21 years old. I am an inspiring individual with a wealth of knowledge and experience to share.
            Passionate about learning and innovation, I strive to make a positive impact in everything I do. I am learning Web development,
            Web design.
          </p>
          <p class="fs-5 mt-4">
            I write codes on my computers. I use Visual Studio Code to write code effectively, it is essential program for creating any
            computer understanding language.
          </p>
          <!-- <p class="fs-5">
        I am using tech Vue 3, Vue router 4, jest-dom
        </p> -->
        </div>
      </section>

      <hr />

      <section class="flex flex-col items-center">
        <h2 class="text-3xl max-w-md text-center mt-4 font-bold">
          Technologies I use/used-to to create
          <span class="text-green-600"> a Web page </span>
        </h2>
        <div class="row align-items-center mt-5">
          <!-- Images section -->
          <div class="col-12 col-md-4 text-center mb-4 mb-md-0 d-flex flex-wrap gap-3 table-hover">
            <div
              v-for="(logo, index) in aboutViewStore.companiesInfo"
              class="w-25 w-md-35 rounded flex-grow-5 flex-shrink-1"
            >
              <a
                :href="logo.href"
                :target="globalStore.isMobile ? '_self' : '_blank'"
                :title="`click to get info about ${logo.name}`"
              >
                <img
                  :key="index"
                  :src="logo.src"
                  :alt="logo.alt"
                  class="w-100 rounded-4 link-img"
                />
              </a>
            </div>
          </div>
          <div
            class="col-12 col-md-8"
            :class="globalStore.theme"
          >
            <ul class="list-unstyled">
              <li
                v-for="(logo, index) in aboutViewStore.companiesInfo"
                :key="index"
                class="rounded shadow-sm mb-4"
              >
                <a
                  :href="logo.href"
                  class="h4 mb-2 text-green-600"
                  :target="globalStore.isMobile ? '_self' : '_blank'"
                >
                  {{ logo.name }}
                </a>
                <ReadMoreText :text="removeNameFromDescriptionComputed(logo.name, logo.description)" />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import ReadMoreText from "@/components/ReadMoreText.vue";
import { useAboutViewStore } from "@/stores/AboutViewStore";
import { useGlobalStore } from "@/stores/GlobalStore";
const globalStore = useGlobalStore();
const aboutViewStore = useAboutViewStore();

const removeNameFromDescriptionComputed = (name: string, description: string): string => {
  return " -" + description.slice(name.length);
};
</script>

<style scoped>
a img,
a {
  transition: transform 0.25s ease-in-out; /* Smooth scaling */
}
a:hover img {
  transform: scale(1.1); /* Increases size by 10% */
}

a.custom-class {
  display: inline-block;
}
a.custom-class:hover {
  transform: scale(1.1); /* Increases size by 10% */
}
img.link-img:hover {
  filter: drop-shadow(1px 1px 3px var(--vue-green));
}
</style>
