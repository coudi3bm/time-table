<template>
  <v-card
    class="rounded-lg time-table pb-1"
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    :flat="flat"
  >
    <slot />
  </v-card>
</template>

<script>
export default {
  props: {
    flat: Boolean,
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

.time-table {
  font-size: 14px;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .time-table {
    font-size: 2.8vw;
  }
}
</style>