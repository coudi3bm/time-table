<template>
  <v-btn
    @click="$emit('click', $event)"
    style="text-transform: none"
    small
    :color="color"
    :block="block"
    depressed
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      default: '',
      type: String,
    },
    block: {
      default: false,
      type: Boolean,
    },
  },
}
</script>