<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2"
    color="background2"
  >
    <div class="mx-auto" style="max-width: 600px">
      <v-row class="px-2" dense>
        <v-col cols="12" sm="6">
          <v-card
            class="text-center rounded-lg"
            :to="`${$route.params.subDivision}/groups`"
            color="content"
            style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
          >
            <v-icon size="100" color="icon2">{{ icons.mdiCalendar }}</v-icon>
            <v-card-title class="d-block pt-0"> Расписание </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card
            class="text-center rounded-lg"
            :to="`${$route.params.subDivision}/teachers`"
            color="content"
            style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
          >
            <v-icon size="100" color="icon2">{{ icons.mdiSchool }}</v-icon>
            <v-card-title class="d-block pt-0">
              Расписание для учителей
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script>
import { mdiCalendar, mdiSchool } from '@mdi/js'

export default {
  layout: 'subDivision',
  data: () => ({
    icons: { mdiCalendar, mdiSchool },
  }),
}
</script>