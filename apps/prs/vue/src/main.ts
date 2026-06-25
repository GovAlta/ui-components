import { createApp, h } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";
import "@abgov/web-components";
import App from "./App.vue";
import Everything from "./Everything.vue";
import { prRouteDefinitions } from "./route-manifest";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: App,
      children: [
        { path: "everything", component: Everything },
        ...prRouteDefinitions.map((route) => ({
          path: route.path,
          component: route.component,
        })),
      ],
    },
  ],
});

const app = createApp({ render: () => h(RouterView) });
app.use(router);
app.mount("#app");
