<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    flat
    dense
    :scroll-threshold="50"
    :hide-on-scroll="false"
    color="header"
    :style="`border-bottom: 1px solid ${$vuetify.theme.currentTheme.headerBorder} !important`"
  >
    <v-toolbar
      max-width="900"
      dense
      flat
      class="mx-auto toolbar"
      color="transparent"
    >
      <v-btn icon v-if="back" :to="back" exact>
        <v-icon color="icon2">{{ icons.mdiArrowLeft }}</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold pa-0 mx-2">
        <span style="text-decoration: none; color: inherit">
          {{ title }}
        </span>
      </v-toolbar-title>
      <v-spacer />
      <slot name="action-buttons" />
    </v-toolbar>
  </v-app-bar>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'

export default {
  props: {
    title: {
      default: 'time-table',
      type: String,
    },
    back: {
      default: '',
      type: String,
    },
  },
  data: () => ({
    icons: { mdiArrowLeft },
  }),
}
</script>