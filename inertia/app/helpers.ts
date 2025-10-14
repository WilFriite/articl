import type { App, DefineComponent, Plugin } from "vue";
import Layout from "~/components/layout/app.vue";

export function initiateApplication(app: App, plugin: Plugin<[]>) {
  return app.use(plugin);
}

export function setLayout(name: string, page: DefineComponent) {
  if (!page.default) {
    throw new Error(`Page ${name} does not have a default export`);
  }

  if (page.default.layout) {
    return;
  }
  page.default.layout = Layout;
}
