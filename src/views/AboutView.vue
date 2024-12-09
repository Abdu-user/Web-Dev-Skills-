<template>
  <!-- <StickyNav /> -->
  <header class="text-center pt-4">
    <!-- :class="" -->
    <h1 class="h2">About Abdurrakhman</h1>
  </header>
  <main class="container my-5">
    <section class="row align-items-center justify-content-evenly">
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
          Web design. I write codes on my computers. I use Visual Studio Code to write code effectively, it is essential program for
          creating any computer understanding language.
        </p>
        <!-- <p class="fs-5">
        I am using tech Vue 3, Vue router 4, jest-dom
        </p> -->
      </div>
    </section>

    <hr />

    <h1 class="text-center">Technologies I use/used-to to create a Web page</h1>
    <section class="row align-items-center mt-5">
      <!-- Images section -->
      <div class="col-12 col-md-4 text-center mb-4 mb-md-0 d-flex flex-wrap gap-3 table-hover">
        <div
          v-for="(logo, index) in companiesLogos"
          class="w-25 w-md-35 rounded flex-grow-5 flex-shrink-1"
        >
          <a
            :href="logo.href"
            target="_blank"
            :title="`click to get info about ${logo.name}`"
          >
            <img
              :key="index"
              :src="logo.src"
              :alt="logo.alt"
              class="w-100 rounded-4"
            />
          </a>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <ul class="list-unstyled">
          <li
            v-for="(logo, index) in companiesLogos"
            :key="index"
            class="rounded shadow-sm mb-4"
          >
            <a
              :href="logo.href"
              target="_blank"
              class="h4 mb-2 custom-class"
            >
              {{ logo.name }}
            </a>
            <span>
              {{ removeNameFromDescriptionComputed(logo.name, logo.description) }}
            </span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// Default Logos
import VueLogo from "../assets/logo.png";
import TestingLibraryLogo from "../assets/Modified-images/testing-library-logo.png";
import VSCode from "../assets/Modified-images/vscode-logo.png";

// Modified Logos
import HTMLLogo from "../assets/Modified-images/html-logo-mod.png";
import CSSLogo from "../assets/Modified-images/css-logo-mod.png";
import JSLogo from "../assets/Modified-images/js-logo-mod.png";
import TSLogo from "../assets/Modified-images/ts-logo-mod.png";
import ReactLogo from "../assets/Modified-images/react-logo-mod.png";
import GitLogo from "../assets/Modified-images/git-logo-mod.png";
import NodeJSLogo from "../assets/Modified-images/node-js-logo-mod.png";
import ChatGPT from "../assets/Modified-images/chat-gpt-logo-mod.png";
import Bootstrap from "../assets/Modified-images/bootstrap-logo-mod.png";

type ImgType = {
  src: string;
  alt: string;
  href: string;
  name: string;
  description: string;
};
const companiesLogos: ImgType[] = [
  {
    src: HTMLLogo,
    alt: "html logo",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    name: "HTML",
    description:
      "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It defines the structure and content of web pages using tags and attributes, forming the backbone of all web content.",
  },
  {
    src: CSSLogo,
    alt: "css logo",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    name: "CSS",
    description:
      "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the design, colors, fonts, spacing, and positioning of elements on the page, making content more visually appealing.",
  },
  {
    src: JSLogo,
    alt: "Javascript logo",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    name: "JavaScript",
    description:
      "JavaScript is a versatile, high-level programming language used for creating dynamic web content. It allows you to add interactivity, manipulate web page elements, and handle asynchronous requests on the client-side.",
  },
  {
    src: TSLogo,
    alt: "Typescript logo",
    href: "https://www.typescriptlang.org/docs/",
    name: "TypeScript",
    description:
      "TypeScript is a superset of JavaScript that adds static typing to the language. It helps developers catch errors at compile time and offers features such as interfaces, enums, and advanced tooling support for building scalable applications.",
  },
  {
    src: VueLogo,
    alt: "Vue logo",
    href: "https://vuejs.org/",
    name: "Vue",
    description:
      "Vue.js is a progressive JavaScript framework used to build interactive user interfaces. It is designed to be incrementally adoptable and focuses on the view layer, offering features like two-way data binding and component-based architecture.",
  },
  {
    src: ReactLogo,
    alt: "React logo",
    href: "https://reactjs.org/docs/getting-started.html",
    name: "React",
    description:
      "React is a JavaScript library for building user interfaces, especially single-page applications. It uses a declarative approach to design and efficiently updates the UI by managing components and rendering views based on data changes.",
  },
  {
    src: TestingLibraryLogo,
    alt: "Testing Library logo",
    href: "https://testing-library.com/docs/",
    name: "Testing Library",
    description:
      "Testing Library is a suite of tools designed to help developers test React components with an emphasis on behavior over implementation details. It encourages testing from a user's perspective and focuses on finding bugs early in the development process.",
  },
  {
    src: GitLogo,
    alt: "Git logo",
    href: "https://git-scm.com/doc",
    name: "Git",
    description:
      "Git is a distributed version control system that tracks changes in source code and enables collaboration among developers. It allows for version history, branching, and merging, making it an essential tool for modern software development workflows.",
  },
  {
    src: VSCode,
    alt: "VSCode logo",
    href: "https://code.visualstudio.com/",
    name: "VS Code",
    description:
      "VS Code (Visual Studio Code) is a lightweight yet powerful code editor designed for developers. It supports multiple programming languages, extensions, debugging, and source control, making it an ideal editor for various development environments.",
  },
  {
    src: NodeJSLogo,
    alt: "NodeJS logo",
    href: "https://nodejs.org/en/docs/",
    name: "Node.js",
    description:
      "Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine. It enables server-side programming with JavaScript, offering a non-blocking I/O model and an extensive library of modules for creating scalable web applications.",
  },
  {
    src: ChatGPT,
    alt: "Chat GPT logo",
    href: "https://openai.com/chatgpt",
    name: "ChatGPT",
    description:
      "ChatGPT is an AI-powered conversational model developed by OpenAI. It uses machine learning to understand and generate human-like responses to text-based queries, enabling natural language understanding and assisting users in various tasks like problem-solving and information retrieval.",
  },
  {
    src: Bootstrap,
    name: "Bootstrap",
    alt: "Bootstrap Logo",
    href: "https://getbootstrap.com/",
    description:
      "Bootstrap is a popular open-source framework for building responsive, mobile-first websites and web applications. It provides pre-designed CSS and JavaScript components such as buttons, modals, grids, and navigation elements, enabling rapid development of aesthetically pleasing user interfaces. It's widely used for its ease of use, flexibility, and extensive documentation.",
  },
];

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
  text-shadow: 1px 1px 10px var(--vue-green);
  display: inline-block;
}
a.custom-class:hover {
  transform: scale(1.1); /* Increases size by 10% */
}
</style>
