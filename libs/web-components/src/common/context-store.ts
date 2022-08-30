import { Writable, writable } from 'svelte/store';

/**
 * Currently the Svelte context api does not work when compiled to web-components.
 * The ContextStore utilizes the Svelte writable store to provide a context like api
 */

const stores: Record<string, ContextStore> = {};

export interface Message {
  [key: string]: unknown;
  type: string;
}

export interface ContextStore {
  subscribe: (cb: (msg: Message) => void) => void
  notify: (msg: Message) => void
}

class ContextStoreInternal implements ContextStore {
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

// Create the context within the parent element
export function createContext(name: string): ContextStore {
  const ctx = new ContextStoreInternal();
  stores[name] = ctx
  return ctx
}

// Get the context reference within the children elements
export function getContext(name: string): ContextStore {
  return stores[name];
}

// Delete the context in the onDestroy hook of the parent element 
export function deleteContext(name: string) {
  const store = stores[name];
  if (!store) return;
  delete stores[name];
}
