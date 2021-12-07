import { writable } from 'svelte/store';

// Stores

export const messageChannel = writable<{ [id: string]: Message }>({})

// Types

export interface Message {
  tag?: string;
  payload?: string;
}
