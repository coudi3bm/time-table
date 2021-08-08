<template>
  <tt-line :number="pair.number" :rounded="rounded">
    <tt-lesson-cell
      :lesson="pair.lessons[0]"
      style="grid-row: 1 / 3; grid-column: 3 / 5"
    />

    <tt-cell
      :class="`${rounded ? 'rounded-br-lg' : ''}`"
      style="grid-row: 1 / 3; grid-column: 5 / 7"
    >
      {{ pair.lessons[0].room }}
    </tt-cell>
  </tt-line>
</template>

<script>
export default {
  props: {
    pair: {
      default: () => {},
      type: Object,
    },
    rounded: {
      default: false,
      type: Boolean,
    },
  },
}
</script>