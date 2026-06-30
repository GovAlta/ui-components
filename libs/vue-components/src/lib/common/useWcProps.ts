import { computed, type ComputedRef } from "vue";
import { kebab, lowercase, type TransformFn } from "./extract-props";

export interface UseWcPropsOptions<T> {
  booleanProps?: (keyof T)[];
  booleanPropsWithFalse?: (keyof T)[];
  jsonProps?: (keyof T)[];
  renamedProps?: Partial<Record<keyof T, string>>;
  transform?: "lowercase" | "kebab";
}

export function useWcProps<T extends Record<string, unknown>>(
  props: T,
  options?: UseWcPropsOptions<T>,
): ComputedRef<Record<string, unknown>> {
  const transformFn: TransformFn =
    options?.transform === "kebab" ? kebab : lowercase;

  return computed(() => {
    const result: Record<string, unknown> = {
      version: "2",
    };

    for (const [key, value] of Object.entries(props)) {
      if (value === undefined) continue;

      const customName = options?.renamedProps?.[key];
      const attrName = customName ?? transformFn(key);

      if (options?.booleanPropsWithFalse?.includes(key)) {
        result[attrName] = value ? "true" : "false";
      } else if (options?.booleanProps?.includes(key)) {
        if (value) result[attrName] = "true";
      } else if (options?.jsonProps?.includes(key)) {
        result[attrName] = JSON.stringify(value);
      } else {
        result[attrName] = value;
      }
    }

    return result;
  });
}
