<template>
  <div class="px-2 pb-1 line-wrapper">
    <tt-cell
      :class="`font-weight-medium no-select ${rounded ? 'rounded-bl-lg' : ''}`"
      style="grid-row: 1 / 3"
    >
      {{ number }}
    </tt-cell>
    <tt-cell class="font-weight-medium no-select">НЧ</tt-cell>
    <tt-cell class="font-weight-medium no-select">Ч</tt-cell>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    number: {
      default: 0,
      type: Number,
    },
    rounded: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.line-wrapper {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 1fr 1fr 7fr 7fr 2fr 2fr;
  grid-template-rows: 1fr 1fr;
  align-items: stretch;
}

.no-select {
  user-select: none;
}
</style>