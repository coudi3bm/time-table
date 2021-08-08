<template>
  <div class="cell">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--v-headerBorder-base);
  text-align: center;
}
</style>