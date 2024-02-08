<script lang="ts">
  import { onMount } from "svelte"
  import { emojis, type Emoji } from "./store"
  import Header from "@/lib/Header.svelte"

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

    console.log($emojis)
  })
</script>

<Header />
