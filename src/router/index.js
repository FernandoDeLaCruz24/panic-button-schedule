import { createRouter, createWebHistory } from "vue-router";

import ScheduleCamouflage from "../pages/ScheduleCamouflage.vue";
import CalculatorCamouflage from "../pages/CalculatorCamouflage.vue";
import Settings from "../pages/Settings.vue";

const routes = [
  { path: "/", name: "schedule", component: ScheduleCamouflage },
  { path: "/calc", name: "calc", component: CalculatorCamouflage },
  { path: "/settings", name: "settings", component: Settings },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
