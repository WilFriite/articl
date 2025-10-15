import type { SharedProps } from "@adonisjs/inertia/types";
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

export const usePageProps = <T extends SharedProps>() => {
  const page = usePage<T>().props;
  return computed(() => page);
};
