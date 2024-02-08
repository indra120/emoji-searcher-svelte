<script>
  import { emojis } from "@/store"
  import EmojiBox from "./EmojiBox.svelte"
</script>

{#if $emojis.length > 0}
  <div class="emojis">
    {#each $emojis.splice(0, 20) as { title, symbol }, i (i)}
      <EmojiBox {title} {symbol} />
    {/each}
  </div>
{/if}

<style scoped>
  .emojis {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: 32px;
  }
</style>