import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/site.css";
import "./assets/css/star.css";
import "./assets/css/shopping_basket.css";
import "./assets/css/check_circle.css";

createApp(App).use(router).mount("#app");

import "bootstrap/dist/js/bootstrap.js";
