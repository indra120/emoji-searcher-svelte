<script lang="ts">
  import { onMount } from "svelte"
  import { emojis, type Emoji } from "./store"
  import Header from "@/lib/Header.svelte"
  import Emojis from "@/lib/Emojis.svelte"

  const API_URL = "https://run.mocky.io/v3/5a982f64-218d-45d7-a380-ebe924d55631"

  onMount(async () => {
    const savedList = JSON.parse(localStorage.getItem("emoji-list")!) || []
    if (savedList.length > 0) {
      return emojis.set(savedList)
    }

    try {
      const res = await fetch(API_URL)
      const resJson: Emoji[] = await res.json()

      emojis.set(resJson)
      localStorage.setItem("emoji-list", JSON.stringify(resJson))
    } catch (error) {
      console.error(error)
    }
  })
</script>

<Header />

<main>
  <Emojis />
</main>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 55px);
    max-width: 480px;
    padding: 16px;
    margin: 0 auto;
    background-color: var(--main-container-color);
  }
</style>