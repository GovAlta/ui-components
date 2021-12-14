import { writable } from 'svelte/store';

// Stores

export const messageChannel = writable<{ [id: string]: Message }>({})

// Types

export interface RadioPayload {
  value: string;
  disabled?: boolean;
  error?: boolean;
}

export interface Message {
  tag?: string;
  payload?: RadioPayload;
}
