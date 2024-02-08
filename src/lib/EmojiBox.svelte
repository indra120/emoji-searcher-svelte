<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte"

  export let title: string
  export let symbol: string

  let isSelected = false
  let timer: NodeJS.Timeout

  const copyToClipboard = () => {
    navigator.clipboard.writeText(symbol)
    isSelected = true
  }

  afterUpdate(() => (timer = setTimeout(() => (isSelected = false), 600)))
  onDestroy(() => clearTimeout(timer))
</script>

<div on:click={copyToClipboard} class="emoji-box" class:selected={isSelected}>
  <p class="emoji">{@html `&#${symbol.codePointAt(0)};`}</p>
  <p class="emoji-text" class:selected-text={isSelected}>
    {isSelected ? "Copied!" : title}
  </p>
</div>

<style scoped>
  .emoji-box {
    background-color: var(--secondary-background-color);
    box-shadow: var(--main-box-shadow);
    border-radius: 4px;
    padding: 8px;
    margin: 4px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-height: 100px;
    min-width: 100px;
    transition: all 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }

  .emoji {
    font-size: 40px;
  }

  .emoji-text {
    font-size: 12px;
    font-weight: 600;
  }

  .selected {
    transform: rotate(32deg) scale(1.4, 1.4);
    box-shadow: var(--main-box-shadow-elevated);
  }

  .selected-text {
    font-size: 16px;
    font-weight: bold;
  }
</style>