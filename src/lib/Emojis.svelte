<script lang="ts">
  import { emojis } from "@/store"
  import EmojiBox from "./EmojiBox.svelte"
  import Empty from "./Empty.svelte"
  import { searchEmoji } from "@/utils/searchEmoji"

  export let search = ""
  $: filteredEmojis = searchEmoji({ emojis: $emojis, search })
</script>

{#if filteredEmojis.length > 0}
  <div class="emojis">
    {#each filteredEmojis as { title, symbol }, i (i)}
      <EmojiBox {title} {symbol} />
    {/each}
  </div>
{:else}
  <Empty text="Oops, zero finding. Let's try another keyword!" />
{/if}

<style scoped>
  .emojis {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: 32px;
  }
</style>
