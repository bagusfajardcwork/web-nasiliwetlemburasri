import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createBootstrap } from "bootstrap-vue-next";
import * as BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";
import { createPinia } from "pinia";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./assets/css/remixicon.css";
import "./assets/css/sidebar-menu.css";
import "./assets/css/simplebar.css";
import "./assets/scss/style.css";

const app = createApp(App).use(router);

// Registrasi seluruh export komponen yang namanya diawali B
Object.entries(BootstrapVueNext).forEach(([name, component]) => {
  if (
    name.startsWith("B") &&
    (typeof component === "object" || typeof component === "function") &&
    component !== null
  ) {
    app.component(name, component as never);
  }
});
app.use(createPinia());
app.use(createBootstrap());
app.use(VueApexCharts);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
