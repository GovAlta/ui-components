import { Writable, writable } from 'svelte/store';

/**
 * Currently the Svelte context api does not work when compiled to web-components.
 * The ContextStore utilizes the Svelte writable store to provide a context like api
 * ```ts
 * // Component 1
 * import { getContext, deleteContext, ContextStore } from '../../common/context-store';
 *
 * // bound prop
 * export let value: string;
 *
 * let store: ContextStore;
 * let unsubscribe: () => void;
 *
 * // listen to changes from outside the component
 * $: {
 *  ctx?.update("parentEvent", { value });
 * }
 *
 * // initialize store
 * onMount(() => {
 *  store = getContext("my-context");
 *  unsubscribe = store.subscribe<CustomType>("childEvent", (data) => {
 *    console.log(data.name, data.value)
 *  })
 * )}
 *
 * onDestroy(() => {
 *   unsubscribe();
 *   deleteContext("my-context");
 * })
 *
 * // =====================
 *
 * // Component 2
 * import { getContext, deleteContext, ContextStore } from '../../common/context-store';
 *
 * let store: ContextStore;
 *
 * onMount(() => {
 *  store = getContext("my-context");
 *
 *  // subscribe to one or more store updates
 *  store.subscribe<CustomType>("parentEvent", (data) => {
 *    // do something with the data
 *  })
 *
 *  onChange(() => {
 *    store.update("childEvent", {
 *      name,
 *      value
 *    })
 *  })
 * )}
 * ```
 */

const stores: Record<string, ContextStore> = {};

export class ContextStore {
  private store: Writable<{ [key: string]: unknown }>;

  constructor() {
    this.store = writable<{ [messageName: string]: unknown }>({});
  }

  subscribe<T extends { type: string}>(event: string, cb: (data: T) => void): () => void {
    return this.store.subscribe((state: T) => {
      if (state.type === event) {
        cb(state as T)
      }
    })
  }

  notify(event: string, data: Record<string, unknown>) {
    this.store.update(() => ({
      type: event,
      ...data,
    }))
  }
}

export function getContext(name: string): ContextStore {
  if (stores[name]) {
    return stores[name];
  }
  stores[name] = new ContextStore();
  return stores[name];
}

export function deleteContext(name: string) {
  const store = stores[name];
  if (!store) return;
  delete stores[name];
}
