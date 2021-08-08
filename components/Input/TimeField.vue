<template>
  <v-text-field
    class="input-time-fix"
    @input="$emit('input', $event)"
    :readonly="readonly"
    :value="value"
    :disabled="disabled"
    :append-icon="icons.mdiClockOutline"
    :label="label"
    type="time"
    dense
    outlined
    hide-details="auto"
  />
</template>

<script>
import { mdiClockOutline } from '@mdi/js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    icons: { mdiClockOutline },
  }),
}
</script>

<style scoped>
.input-time-fix ::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>