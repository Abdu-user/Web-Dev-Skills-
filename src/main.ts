import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./main.css";
import bus from "./globals/bus";

const app = createApp(App);
app.use(router);
app.provide("$bus", bus);
app.mount("#app");
