<template>
  <div class="d-inline">
    <v-combobox
      v-if="multiple"
      @click.native="show = true"
      :append-icon="icons.mdiCalendar"
      :label="label"
      :dense="dense"
      :value="value"
      :rules="rules"
      readonly
      outlined
      multiple
      small-chips
      autocomplete="on"
      hide-details="auto"
    />

    <v-text-field
      v-else
      @click.native="show = true"
      :append-icon="icons.mdiCalendar"
      :label="label"
      :dense="dense"
      :value="value"
      :rules="rules"
      readonly
      outlined
      autocomplete="on"
      hide-details="auto"
    />

    <v-dialog
      v-model="show"
      eager
      persistent
      content-class="rounded-dialog"
      max-width="400"
      overlay-color="black"
      overlay-opacity="0.5"
    >
      <v-card color="content" rounded="lg" flat width="100%">
        <div class="ma-1 pt-1">
          <v-date-picker
            v-model="date"
            class="rounded-lg"
            style="width: 100%"
            header-color="primary"
            locale="ru"
            scrollable
            :allowed-dates="allowDates"
            :dark="theme"
            :value="value"
            :multiple="multiple"
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <cancel-button @click="show = false"> Отмена </cancel-button>
          <action-button
            @click="
              $emit('input', date)
              show = false
              date = null
            "
          >
            Выбрать
          </action-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

export default {
  props: {
    value: {
      type: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    dense: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    allowDates: {
      type: Function,
      default: () => true,
    },
  },
  data: () => ({
    icons: { mdiCalendar },
    date: null,
    show: false,
    theme: false,
  }),
  mounted() {
    this.theme = this.$vuetify.theme.dark
  },
}
</script>