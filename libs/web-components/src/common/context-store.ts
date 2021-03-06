import { tick } from 'svelte';
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
 *
 * // listen to changes from outside the component
 * $: {
 *  ctx.update("parentEvent", { value });
 * }
 *
 * // initialize store
 * onMount(() => {
 *  store = getContext("my-context");
 *  store.subscribe<CustomType>("childEvent", (data) => {
 *    console.log(data.name, data.value)
 *  })
 * )}
 *
 * onDestroy(() => {
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

export interface Message {
  [key: string]: unknown;
  type: string;
}

export class ContextStore {
  private store: Writable<Message>;

  constructor() {
    this.store = writable<Message>();
  }

  subscribe(cb: (msg: Message) => void) {
    this.store.subscribe(state => {
      cb((state as unknown) as Message)
    })
  }

  notify(msg: Message) {
    this.store.update(() => msg);
  }
}

export function createContext(name: string): ContextStore {
  const ctx = new ContextStore();
  stores[name] = ctx
  return ctx
}

export async function getContext(name: string): Promise<ContextStore> {
  return await _getContext(name, 0);
}

async function _getContext(name: string, attempts: number): Promise<ContextStore> {
  if (attempts > 10) {
    throw new Error(`Could not find context ${name}`)
  }
  if (stores[name]) {
    return stores[name];
  }
  await tick();
  return _getContext(name, attempts + 1);
}

export function deleteContext(name: string) {
  const store = stores[name];
  if (!store) return;
  delete stores[name];
}
