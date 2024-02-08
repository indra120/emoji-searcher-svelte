import { writable } from "svelte/store"

export interface Emoji {
  title: string
  symbol: string
  keywords: string
}

export const emojis = writable<Emoji[]>([])