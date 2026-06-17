import { computed, type ComputedRef } from "vue";
import { kebab, lowercase, type TransformFn } from "./extract-props";

export interface UseWcPropsOptions {
  booleanProps?: string[];
  booleanPropsWithFalse?: string[];
  jsonProps?: string[];
  renamedProps?: Record<string, string>;
  transform?: "lowercase" | "kebab";
}

export function useWcProps(
  props: Record<string, unknown>,
  options?: UseWcPropsOptions
): ComputedRef<Record<string, unknown>> {
  const transformFn: TransformFn = options?.transform === "kebab" ? kebab : lowercase;

  return computed(() => {
    const result: Record<string, unknown> = {
      version: "2",
    };

    for (const [key, value] of Object.entries(props)) {
      if (value === undefined) continue;

      const customName = options?.renamedProps?.[key];
      const attrName = customName ?? transformFn(key);

      if (key.startsWith("data-")) {
        result[key] = value;
      } else if (options?.booleanPropsWithFalse?.includes(key)) {
        result[attrName] = value ? "true" : "false";
      } else if (options?.booleanProps?.includes(key)) {
        result[attrName] = value ? "true" : undefined;
      } else if (options?.jsonProps?.includes(key)) {
        result[attrName] = JSON.stringify(value);
      } else {
        result[attrName] = value;
      }
    }

    return result;
  });
}
