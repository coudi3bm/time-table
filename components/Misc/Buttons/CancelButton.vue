<template>
  <v-btn
    @click="$emit('click', $event)"
    class="primary--text px-4"
    height="32"
    :style="`border: thin solid ${$vuetify.theme.currentTheme.headerBorder}; text-transform: none`"
    small
    outlined
  >
    <slot />
  </v-btn>
</template>

<script>
export default {}
</script>