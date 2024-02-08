<script lang="ts">
  export let text: string
</script>

<div>{text}</div>

<style scoped>
  div {
    min-height: calc(100vh - 165px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
</style>