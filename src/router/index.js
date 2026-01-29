import { createRouter, createWebHistory } from "vue-router";
import PanicButton from "../pages/PanicButton.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "panic",
      component: PanicButton,
    },
  ],
});

export default router;
