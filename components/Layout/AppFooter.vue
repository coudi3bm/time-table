<template>
  <v-footer :padless="!mode" class="px-0 pb-0" color="transparent">
    <v-sheet width="900" class="mx-auto" color="background2">
      <v-container v-if="mode === 'version'">
        <v-row align="center" justify="center">
          <span> <strong>Электронное расписание</strong> </span>
        </v-row>
        <v-row align="center" justify="center">
          <span> Версия 2.0 — <strong>Remake</strong> </span>
        </v-row>
      </v-container>

      <v-container v-else-if="mode === 'subDivision'">
        <v-row align="center" justify="center" justify-sm="start">
          <v-btn color="primary" text to="/" style="text-transform: none">
            <v-icon left>{{ icons.mdiChevronLeft }}</v-icon>
            Выбрать другую площадку
          </v-btn>
        </v-row>
      </v-container>
    </v-sheet>
  </v-footer>
</template>

<script>
import { mdiChevronLeft } from '@mdi/js'

export default {
  props: {
    mode: {
      default: '',
      type: String,
    },
  },
  data: () => ({
    icons: { mdiChevronLeft },
  }),
}
</script>