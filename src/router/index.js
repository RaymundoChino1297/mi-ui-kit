import { createRouter, createWebHistory } from "vue-router";
import AppShell from "@/layouts/AppShell.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppShell,
      children: [
        {
          path: "",
          redirect: "/demo",
        },
        {
          path: "demo",
          name: "demo",
          component: () => import("@/views/DemoAppView.vue"),
          meta: { title: "Demo aplicación" },
        },
        {
          path: "ui-kit",
          name: "ui-kit",
          component: () => import("@/views/UiKitView.vue"),
          meta: { title: "UI Kit" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/demo",
    },
  ],
});

export default router;
