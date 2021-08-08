<template>
  <v-sheet class="mx-auto" color="transparent" max-width="500">
    <div v-if="!selectedName || err">
      <v-card
        class="rounded-lg"
        color="content"
        style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
      >
        <v-card-text> Выберите группу или учителя в настройках </v-card-text>
      </v-card>
    </div>

    <div v-else class="text-center">
      <tt-parity style="width: 100%" class="mb-4" />
      <v-progress-circular
        v-if="$fetchState.pending"
        :size="50"
        indeterminate
        color="primary"
      />
      <div v-else>
        <tt-week :items="timeTable" />
        <p
          v-if="!objIsEmpty(replacements)"
          ref="replacements"
          class="text-h5 text-center font-weight-medium"
        >
          Замены
        </p>
        <tt-week :items="replacements" />
        <div v-if="type === 'groups'">
          <p ref="replacements" class="text-h5 text-center font-weight-medium">
            Расписание звонков
          </p>
          <call-times-table :lunchTimes="lunchTimes" :callTimes="callTimes" />
        </div>
      </div>
    </div>

    <v-snackbar
      v-model="showSnackBar"
      class="snackbar"
      top
      timeout="3000"
      right
      multi-line
    >
      Внимание есть замены!
      <template v-slot:action="{ attrs }">
        <v-btn
          style="text-transform: none"
          text
          color="primary"
          v-bind="attrs"
          @click="$refs.replacements.scrollIntoView()"
        >
          Перейти
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script>
import { objIsEmpty } from '~/utils/index'
import TimeTableUtil from '~/utils/time-table'
import DateUtil from '~/utils/date-util'
import {} from '@mdi/js'

export default {
  props: {
    type: String,
  },
  data: () => ({
    timeTable: {},
    replacements: {},
    lunchTimes: {
      start: '',
      end: '12:45',
    },
    callTimes: [],
    showSnackBar: false,
    err: false,
  }),
  computed: {
    selectedName() {
      if (this.type === 'groups') {
        return this.$store.state.settings.selectedNames.group
      } else if ((this.type = 'teachers')) {
        return this.$store.state.settings.selectedNames.teacher
      }
    },
  },
  async asyncData({ $acios, route, store }) {},
  async fetch() {
    try {
      this.err = false
      let data = await this.$axios.$get(
        `/api/${encodeURI(this.$route.params.subDivision)}/${
          this.type
        }/${encodeURI(this.selectedName)}`
      )
      this.lunchTimes = data.lunchTimes
        ? data.lunchTimes
        : { start: '', end: '' }
      this.callTimes = data.callTimes ? data.callTimes : []

      const actualReplacements = TimeTableUtil.optimizeReplacementsForActualDays(
        data.replacements
      )
      // console.log(actualReplacements)
      this.replacements = actualReplacements.replacements
      this.showSnackBar = actualReplacements.haveActulalDays

      if (this.$store.state.settings.scheduleFilter.parity) {
        console.log(DateUtil.getPairtyOfWeek(new Date()))
        this.timeTable = TimeTableUtil.optimizeTimeTableForParityAndSubGroup(
          data.timeTable,
          DateUtil.getPairtyOfWeek(new Date()),
          this.type === 'groups'
            ? this.$store.state.settings.scheduleFilter.subgroup
            : 'all'
        )
      } else {
        this.timeTable = data.timeTable
      }
    } catch (err) {
      this.err = true
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'settings/setScheduleFilter' ||
        mutation.type === 'settings/setSelectedNames'
      ) {
        this.$fetch()
      }
    })
  },
  methods: {
    objIsEmpty,
  },
}
</script>