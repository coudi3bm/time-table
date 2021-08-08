<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2"
    color="background2"
  >
    <v-row class="px-2" dense>
      <v-col cols="12" sm="4">
        <v-row dense>
          <v-col cols="12">
            <v-card
              rounded="lg"
              color="content"
              style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
            >
              <v-card-title> Настройки </v-card-title>
              <v-card-text>
                <v-btn
                  v-if="false"
                  class="mb-1"
                  depressed
                  block
                  style="text-transform: none"
                  @click="checkOptimize"
                >
                  Проверка
                </v-btn>
                <v-btn
                  depressed
                  block
                  style="text-transform: none"
                  @click="sendDb"
                >
                  <v-icon left> {{ icons.mdiCloudUpload }} </v-icon>
                  Отправить
                </v-btn>
                <v-btn
                  @click="$refs.uploader.click()"
                  class="mt-1"
                  depressed
                  block
                  style="text-transform: none"
                >
                  <v-icon left> {{ icons.mdiFileUpload }} </v-icon>
                  Загрузить
                </v-btn>
                <v-btn
                  @click="downloadDb"
                  class="mt-1"
                  depressed
                  block
                  style="text-transform: none"
                >
                  <v-icon left> {{ icons.mdiDownload }} </v-icon>
                  Скачать
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <ed-tree-view-time-table
              @click="selectedDay = $event"
              :active="
                selectedDay.type === 'timeTable' ? selectedDay.event : []
              "
            />
          </v-col>

          <v-col cols="12">
            <ed-tree-view-replacements
              @click="selectedDay = $event"
              :active="
                selectedDay.type === 'replacements' ? selectedDay.event : []
              "
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="8">
        <tt-day
          @contextmenu="showSplitsMenu($event)"
          v-if="selectedDay.day && selectedDay.group"
          :day="selectedDay.day + ' — ' + selectedDay.group"
          :items="selectedDayItems"
        />
      </v-col>
    </v-row>
    <v-row class="px-2" dense>
      <v-col cols="12" sm="6">
        <ed-list-form
          @add="$store.commit('db/lessons/add', $event)"
          @update="$store.commit('db/lessons/update', $event)"
          @remove="$store.commit('db/lessons/remove', $event)"
          title="Предметы"
          :items="$store.state.db.lessons.list"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <ed-list-form
          @add="$store.commit('db/teachers/add', $event)"
          @update="$store.commit('db/teachers/update', $event)"
          @remove="$store.commit('db/teachers/remove', $event)"
          title="Учителя"
          :items="$store.state.db.teachers.list"
        />
      </v-col>

      <v-col cols="12">
        <ed-lunch-times />
      </v-col>

      <v-col cols="12">
        <ed-call-times />
      </v-col>
    </v-row>

    <ed-splits-menu
      @click="editPair($event)"
      v-model="splitsMenu.show"
      :x="splitsMenu.x"
      :y="splitsMenu.y"
      :number="splitsMenu.number"
      :activeType="splitsMenu.activeType"
    />

    <ed-pair-dialog
      @save-edit="saveEdit($event)"
      v-model="editDialog.show"
      :type="editDialog.type"
      :items="editDialog.data"
    />

    <input ref="uploader" class="d-none" type="file" @change="uploadDb" />
  </v-sheet>
</template>

<script>
import {
  mdiDownload,
  mdiFileDownload,
  mdiFileUpload,
  mdiCloudUpload,
  mdiPencil,
  mdiTrashCan,
} from '@mdi/js'
import DateUtil from '~/utils/date-util'
import TimeTableUtil from '~/utils/time-table'

export default {
  layout: 'editor',
  middleware: 'auth',
  data: () => ({
    icons: {
      mdiDownload,
      mdiFileDownload,
      mdiFileUpload,
      mdiCloudUpload,
      mdiPencil,
      mdiTrashCan,
    },
    editDialog: {
      show: false,
      type: '',
      data: [],
    },
    splitsMenu: {
      show: false,
      x: 0,
      y: 0,
      number: 0,
      activeType: '',
    },
    selectedDay: {
      group: null,
      day: null,
      type: null,
      event: [],
    },
  }),
  async asyncData({ $axios, store, route }) {
    if (store.state.auth.loggedIn) {
      await store.dispatch('db/fetch', route.params.subDivision)
      return { asyncDataWorked: true }
    }
  },
  async fetch() {
    if (!this.asyncDataWorked) {
      await this.$store.dispatch('db/fetch', this.$route.params.subDivision)
    }
  },
  computed: {
    selectedDayItems() {
      const type = this.selectedDay.type
      const group = this.selectedDay.group
      const day = this.selectedDay.day
      if (type === 'timeTable') {
        return this.$store.state.db.timeTable.groups[group][day]
      } else if (type === 'replacements') {
        return this.$store.state.db.replacements.groups[group][day]
      } else {
        return []
      }
    },
  },
  methods: {
    checkOptimize() {
      const timeTable = JSON.parse(
        JSON.stringify(this.$store.state.db.timeTable.groups)
      )
      TimeTableUtil.optimizeDayForTeacher(
        timeTable,
        'Кузьмина О.Б.',
        'Понедельник'
      )
    },
    async sendDb() {
      const tempTimeTable = JSON.parse(
        JSON.stringify(this.$store.state.db.timeTable.groups)
      )
      const tempReplacements = JSON.parse(
        JSON.stringify(this.$store.state.db.replacements.groups)
      )
      const replacementsDays = []
      for (let group in tempReplacements) {
        Object.keys(tempReplacements[group]).some((item) => {
          if (!replacementsDays.includes(item)) replacementsDays.push(item)
        })
      }
      //console.log(replacementsDays)

      let data = {
        teachers: { timeTable: {}, replacements: {} },
        groups: {
          timeTable: this.$store.state.db.timeTable.groups,
          replacements: this.$store.state.db.replacements.groups,
        },
        lists: {
          lessons: this.$store.state.db.lessons.list,
          teachers: this.$store.state.db.teachers.list,
          lunchTimes: this.$store.state.db.lunchTimes.list,
          callTimes: this.$store.state.db.callTimes.list,
        },
      }
      let daySlice = { start: -1, end: -1 }
      for (const teacher of this.$store.state.db.teachers.list) {
        data.teachers.timeTable[teacher] = {}
        for (const [i, day] of DateUtil.daysOfWeek.entries()) {
          const dayPairs = TimeTableUtil.optimizeDayForTeacher(
            tempTimeTable,
            teacher,
            day
          )
          if (dayPairs) {
            data.teachers.timeTable[teacher][day] = dayPairs
            daySlice = { start: -1, end: -1 }
          } else {
            data.teachers.timeTable[teacher][day] = []
            if (daySlice.start === -1) daySlice = { start: i, end: i }
            else daySlice.end++
          }
        }
        console.log(
          teacher,
          daySlice,
          DateUtil.daysOfWeek[daySlice.start],
          DateUtil.daysOfWeek[daySlice.end]
        )
        for (
          let dayIndex = daySlice.start;
          dayIndex < daySlice.end + 1;
          dayIndex++
        ) {
          delete data.teachers.timeTable[teacher][DateUtil.daysOfWeek[dayIndex]]
        }
        data.teachers.replacements[teacher] = {}
        for (const day of replacementsDays) {
          const dayPairs = TimeTableUtil.optimizeDayForTeacher(
            tempReplacements,
            teacher,
            day
          )
          if (dayPairs) data.teachers.replacements[teacher][day] = dayPairs
        }
      }
      console.log(data)
      try {
        await this.$axios.$post(
          `/api/${this.$route.params.subDivision}/db`,
          data
        )
        this.$notifier.showMessage({
          content: 'Расписание успешно отправлено на сервер',
          color: 'success',
        })
      } catch (error) {
        console.log(error)
        this.$notifier.showMessage({
          content: 'Ошибка при отправке расписания',
          color: 'error',
        })
      }
    },
    downloadDb() {
      const link = document.createElement('a')
      link.download = 'расписание.json'
      link.href =
        'data:application/json,' +
        encodeURIComponent(
          JSON.stringify({
            timeTable: this.$store.state.db.timeTable.groups,
            replacements: this.$store.state.db.replacements.groups,
            lessons: this.$store.state.db.lessons.list,
            teachers: this.$store.state.db.teachers.list,
            lunchTimes: this.$store.state.db.lunchTimes.list,
            callTimes: this.$store.state.db.callTimes.list,
          })
        )
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    uploadDb(event) {
      const file = event.target.files[0]
      if (file) {
        let reader = new FileReader()
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result)
          console.log(data)
          this.$store.commit('db/lessons/set', data.lessons)
          this.$store.commit('db/teachers/set', data.teachers)
          this.$store.commit('db/lunchTimes/set', data.lunchTimes)
          this.$store.commit('db/callTimes/set', data.callTimes)
          this.$store.commit('db/timeTable/set', data.timeTable)
          this.$store.commit('db/replacements/set', data.replacements)
        }
        reader.readAsText(file)
      }
    },

    showSplitsMenu(event) {
      event.event.preventDefault()
      // В противном случае list-item-group
      // в EdSplitsMenu не обновляет свое состояние
      this.splitsMenu.activeType = ''

      !this.$nextTick(() => {
        if (!this.splitsMenu.show) {
          this.splitsMenu.number = event.index + 1
          this.splitsMenu.activeType = TimeTableUtil.getPairTypeFromNumber(
            event.item.type
          )
          this.splitsMenu.x = event.event.clientX
          this.splitsMenu.y = event.event.clientY
        }
        this.splitsMenu.show = !this.splitsMenu.show
      })
    },
    editPair(type) {
      this.editDialog.type = type
      if (this.splitsMenu.activeType === type) {
        let data = this.$store.getters[`db/${this.selectedDay.type}/getByDay`](
          this.selectedDay.group,
          this.selectedDay.day
        )[this.splitsMenu.number - 1].lessons
        this.editDialog.data = JSON.parse(JSON.stringify(data))
      } else {
        this.editDialog.data = TimeTableUtil.createLessons(type)
      }
      // В теория должно срабатывать лучше так как dom уже готов к отрисовке
      this.$nextTick(() => {
        this.editDialog.show = true
      })
    },
    saveEdit(lessons) {
      // console.log(this.splitsMenu, this.selectedDay, this.editDialog)
      this.$store.commit(`db/${this.selectedDay.type}/updateLessons`, {
        group: this.selectedDay.group,
        day: this.selectedDay.day,
        index: this.splitsMenu.number - 1,
        lessons: lessons,
        type: TimeTableUtil.getPairTypeNumberFromString(this.editDialog.type),
      })
      this.editDialog.show = false
    },
  },
}
</script>