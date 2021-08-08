<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2"
    color="background2"
  >
    <v-row class="px-2" no-gutters justify="center" align="center">
      <v-col>
        <span class="text-h4 font-weight-bold">Площадки</span>
      </v-col>
    </v-row>

    <v-row class="mt-2 px-2" dense>
      <v-col
        cols="12"
        sm="4"
        md="3"
        v-for="(subDivision, i) in subDivisions"
        :key="i"
      >
        <v-card
          class="rounded-lg"
          :to="`/${subDivision}`"
          color="content"
          style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
        >
          <v-row no-gutters align="center" class="pr-4">
            <v-col cols="10">
              <v-card-title>
                <span class="text-truncate"> {{ subDivision }} </span>
              </v-card-title>
            </v-col>
            <v-col class="text-right">
              <v-icon>{{ icons.mdiChevronRight }}</v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mdiChevronRight } from '@mdi/js'

export default {
  data: () => ({
    icons: { mdiChevronRight },
  }),
  async asyncData({ $axios }) {
    const subDivisions = await $axios.$get(`/api/subDivisions`)
    return { subDivisions }
  },
}
</script>