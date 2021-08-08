<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2 px-2"
    color="background2"
  >
    <tt-page type="groups" />
    <mobile-app-ad />
  </v-sheet>
</template>

<script>
import {} from '@mdi/js'

export default {
  layout: 'groups',
  data: () => ({
    icons: {},
  }),
}
</script>