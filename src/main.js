import { createApp } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import pinia from "@/includes/pinia";
import App from "./App.vue";
import router from "./router";
import "@/includes/validation";
import "@/includes/axios";
import "@/assets/tailwind.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.component("AuthLayout", AuthLayout);

app.mount("#app");
