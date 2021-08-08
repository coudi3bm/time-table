<template>
  <v-btn
    @click="$emit('click', $event)"
    class="px-4"
    height="32"
    color="primary"
    style="text-transform: none"
    small
    depressed
  >
    <slot />
  </v-btn>
</template>

<script>
export default {}
</script>