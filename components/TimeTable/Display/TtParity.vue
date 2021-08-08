<template>
  <v-card
    class="rounded-lg"
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
  >
    <v-card-title class="d-block text-center">
      <div class="text-h5 font-weight-bold">
        <span v-if="weekNumber % 2 === 0">Четная</span>
        <span v-else>Нечетная</span>
      </div>
      <div class="text-h6 font-weight-medium">
        <span v-if="weekStartEnd.start.getDate() > weekStartEnd.end.getDate()">
          С {{ weekStartEnd.start.getDate() }}
          {{ getMonthName(weekStartEnd.start) }} — по
          {{ weekStartEnd.end.getDate() }} {{ getMonthName(weekStartEnd.end) }}
        </span>
        <span v-else>
          С {{ weekStartEnd.start.getDate() }} — по
          {{ weekStartEnd.end.getDate() }} {{ getMonthName(weekStartEnd.end) }}
        </span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import DateUtil from '~/utils/date-util'

export default {
  data: () => ({}),
  computed: {
    weekStartEnd() {
      return DateUtil.getWeekStartEndDays(new Date())
    },
    weekNumber() {
      return DateUtil.getWeekNumber(this.weekStartEnd.start)
    },
  },
  methods: {
    getMonthName(date) {
      return DateUtil.getMonthName(date)
    },
  },
}
</script>