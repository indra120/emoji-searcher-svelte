<script lang="ts">
  import { emojis, type Emoji } from "@/store"
  import Header from "@/lib/Header.svelte"
  import Emojis from "@/lib/Emojis.svelte"
  import Empty from "@/lib/Empty.svelte"

  const API_URL = "https://run.mocky.io/v3/5a982f64-218d-45d7-a380-ebe924d55631"

  let search: string

  const getEmojis = async () => {
    try {
      const savedList = JSON.parse(localStorage.getItem("emoji-list")!) || []
      if (savedList.length > 0) {
        return emojis.set(savedList)
      }

      const res = await fetch(API_URL)
      const resJson: Emoji[] = await res.json()

      emojis.set(resJson)
      localStorage.setItem("emoji-list", JSON.stringify(resJson))
    } catch (error) {
      console.error(error)
      throw Error("Error!")
    }
  }
</script>

<Header />

<main>
  <input bind:value={search} type="text" placeholder="Search" />

  {#await getEmojis()}
    <Empty text="Loading..." />
  {:then res}
    <Emojis {search} />
  {:catch err}
    <Empty text={err.message} />
  {/await}
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

  input {
    box-shadow: var(--main-box-shadow);
    border: none;
    border-radius: 6px;
    padding: 10px;
    color: var(--main-font-color);
    font-size: 16px;
    font-weight: 600;
  }
</style>