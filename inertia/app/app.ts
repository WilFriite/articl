/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import "../css/app.css";
import { resolvePageComponent } from "@adonisjs/inertia/helpers";
import { createInertiaApp } from "@inertiajs/vue3";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { TuyauPlugin } from "@tuyau/inertia/vue";
import type { DefineComponent } from "vue";
import { createApp, h } from "vue";
import Layout from "~/components/layout/app.vue";
import { tuyau } from "./tuyau";

const appName = import.meta.env.VITE_APP_NAME || "AdonisJS";

// Access QueryClient instance
const queryClient = new QueryClient();

createInertiaApp({
  progress: { color: "#5468FF" },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>("../pages/**/*.vue"),
    );

    if (!page.default) {
      throw new Error(`Page ${name} does not have a default export`);
    }
    page.default.layout = Layout;

    return page;
  },

  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(TuyauPlugin, { client: tuyau })
      .use(VueQueryPlugin, { queryClient })
      .mount(el);
  },
});
