import { defineStore } from "pinia";

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

export type ImgType = {
  src: string;
  alt: string;
  href: string;
  name: string;
  description: string;
};
type AboutViewStoreType = {
  companiesInfo: ImgType[];
};
export const useAboutViewStore = defineStore("aboutViewStore", {
  state: (): AboutViewStoreType => ({
    companiesInfo: [
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
    ],
  }),
});
