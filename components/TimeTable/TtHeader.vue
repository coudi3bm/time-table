<template>
  <div class="text-center px-2 pt-1 pb-1">
    <div class="text-h6 font-weight-bold">{{ day }}</div>
    <div class="header-wrapper font-weight-medium">
      <tt-cell class="rounded-tl-lg" style="grid-column: 1 / 3" />
      <tt-cell>Группа 1</tt-cell>
      <tt-cell>Группа 2</tt-cell>
      <tt-cell class="rounded-tr-lg" style="grid-column: 5 / 7"
        >Кабинет</tt-cell
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['day'],
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: 1fr 1fr 7fr 7fr 2fr 2fr;
  grid-template-rows: 1fr;
}
</style>