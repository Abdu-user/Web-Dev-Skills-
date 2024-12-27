import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./customBootstrap.css";
import "./assets/tailwind.css";
// import "./assets/"
import "./main.css";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

// import bus from "./globals/bus";
// app.provide("$bus", bus);
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(autoAnimatePlugin);
app.mount("#app");
