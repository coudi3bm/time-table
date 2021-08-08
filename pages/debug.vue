<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2"
    color="background2"
  >
    <v-sheet class="px-2" max-width="400" color="transparent">
      <span class="text-h4 font-weight-bold"> Темы </span>
      <v-sheet class="mt-2" max-width="400" color="transparent">
        <v-item-group
          active-class="primary"
          mandatory
          @change="changeTheme"
          v-model="theme.value"
        >
          <v-row dense>
            <v-col
              :cols="item.cols"
              v-for="(item, i) in theme.buttons"
              :key="i"
            >
              <v-item v-slot="{ toggle }" :value="item.value">
                <v-btn
                  height="50"
                  block
                  depressed
                  @click="toggle"
                  style="text-transform: none"
                >
                  {{ item.text }}
                  <v-icon right>{{ item.icon }}</v-icon>
                </v-btn>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-sheet>
    </v-sheet>

    <v-sheet class="mt-4 px-2" max-width="400" color="transparent">
      <span class="text-h4 font-weight-bold"> Кнопки </span>
      <v-row class="mt-2" dense>
        <v-col cols="auto">
          <cancel-button> Cancel button </cancel-button>
        </v-col>

        <v-col cols="auto">
          <action-button> Action button </action-button>
        </v-col>

        <v-col cols="auto">
          <standart-button> Standart button </standart-button>
        </v-col>

        <v-col cols="auto">
          <standart-button color="primary">
            <v-icon left>{{ icons.mdiPlus }}</v-icon>
            <span>Standart button</span>
          </standart-button>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mt-4 px-2" max-width="400" color="transparent">
      <span class="text-h4 font-weight-bold"> Store </span>
      <v-row class="mt-2" dense>
        <v-col cols="auto">
          <standart-button @click="$store.commit('db/lessons/add', 'vald')">
            lesson create
          </standart-button>
        </v-col>
        <v-col cols="auto">
          <standart-button @click="$store.commit('db/teachers/add', 'vald')">
            teacher create
          </standart-button>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mt-4 px-2" max-width="400" color="transparent">
      <span class="text-h4 font-weight-bold"> Поля ввода </span>
      <v-row class="mt-2" dense>
        <v-col cols="auto">
          <date-field v-model="inputData.date" label="Дата" dense />
        </v-col>
        <v-col cols="auto">
          <v-text-field dense outlined type="date" />
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mt-4 px-2" max-width="400" color="transparent">
      <span class="text-h4 font-weight-bold"> Диалоговые окна </span>
      <v-row class="mt-2" dense>
        <v-col cols="auto">
          <dialog-template v-model="templateDialog" title="Dialog Template">
            <template v-slot:activator="{ on }">
              <standart-button color="primary" v-on="on">
                <span>Dialog Template</span>
              </standart-button>
            </template>
            <v-card-text> Шаблон диалогового окна </v-card-text>
            <v-card-actions>
              <v-spacer />
              <cancel-button @click="templateDialog = false">
                Отмена
              </cancel-button>
              <action-button @click="testAlert('Принять')">
                Принять
              </action-button>
            </v-card-actions>
          </dialog-template>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mt-4 px-2" color="transparent">
      <span class="text-h4 font-weight-bold"> Расписание </span>

      <v-sheet class="mx-auto" color="transparent" max-width="500">
        <tt-parity style="width: 100%" class="mt-2" />

        <tt-card style="width: 100%" class="mt-4">
          <tt-header day="Типы разделений" />
          <tt-split-simple :pair="testData.splits[0]" />
          <tt-split-group :pair="testData.splits[1]" />
          <tt-split-parity :pair="testData.splits[2]" />
          <tt-split-group-parity :pair="testData.splits[3]" />
          <tt-split-parity-left :pair="testData.splits[4]" />
          <tt-split-parity-right :pair="testData.splits[5]" />
          <tt-split-group-up :pair="testData.splits[6]" />
          <tt-split-group-down rounded :pair="testData.splits[7]" />
        </tt-card>

        <tt-day
          @contextmenu="showSplitsMenu($event)"
          class="mt-4"
          style="width: 100%"
          day="Понедельник"
          :currentPairNumber="3"
          :items="testData.timeTable['Понедельник']"
        />

        <tt-day
          class="mt-4"
          style="width: 100%"
          day="Пустой"
          flat
          :items="[]"
        />
      </v-sheet>
    </v-sheet>

    <v-sheet class="mt-4 px-2" color="transparent">
      <span class="text-h4 font-weight-bold"> Расписание на неделю</span>

      <v-sheet class="mx-auto" color="transparent" max-width="500">
        <tt-parity style="width: 100%" class="mt-2" />
        <tt-week :items="testData.timeTable" />
      </v-sheet>
    </v-sheet>

    <ed-splits-menu
      @click="testLog($event)"
      v-model="splitsMenu.show"
      :x="splitsMenu.x"
      :y="splitsMenu.y"
      :number="splitsMenu.number"
      :activeType="splitsMenu.activeType"
    />
  </v-sheet>
</template>

<script>
import {
  mdiPlus,
  mdiWhiteBalanceSunny,
  mdiWeatherNight,
  mdiDesktopTowerMonitor,
} from '@mdi/js'
import TimeTableUtil from '~/utils/time-table'
import TtWeek from '../components/TimeTable/Display/TtWeek.vue'

export default {
  components: { TtWeek },
  layout: 'debug',
  data: () => ({
    icons: {
      mdiPlus,
      mdiWhiteBalanceSunny,
      mdiWeatherNight,
      mdiDesktopTowerMonitor,
    },
    theme: {
      value: 'system',
      buttons: [
        {
          text: 'Светлая',
          value: 'light',
          cols: '6',
          icon: mdiWhiteBalanceSunny,
        },
        { text: 'Темная', value: 'dark', cols: '6', icon: mdiWeatherNight },
        {
          text: 'Системная',
          value: 'system',
          cols: '12',
          icon: mdiDesktopTowerMonitor,
        },
      ],
    },
    testData: {
      splits: {
        0: {
          number: 1,
          lessons: [
            {
              name: 'МДК.04.01 Внедрение и поддержка компьютерных систем',
              room: '207',
              teacher: 'Задеба А.А.',
            },
          ],
        },
        1: {
          number: 2,
          lessons: [
            { name: 'Программирование', room: '206', teacher: 'Гулямов Г. Ш.' },
            {
              name: 'МДК.02.03 Математическое моделирование',
              room: '301',
              teacher: 'Кузьмина О.Б.',
            },
          ],
        },
        2: {
          number: 3,
          lessons: [
            {
              name:
                'УД.01 Введение в специальность | УД.02 Индивидуальный проект',
              room: '208',
              teacher: 'Черепанова А.О.',
            },
            {
              name: 'ОУД.02 Литература',
              room: '205',
              teacher: 'Борисова Е.Б.',
            },
          ],
        },
        3: {
          number: 4,
          lessons: [
            {
              name: 'ОУД.06 Физическая культура',
              room: '1',
              teacher: 'Арутюнов В.А.',
            },
            {
              name: 'ОУД.03 Иностранный язык',
              room: '2',
              teacher: 'Аленичева С.В.',
            },
            {
              name: 'ОУД.03 Иностранный язык',
              room: '3',
              teacher: 'Аленичева С.В.',
            },
            {
              name: 'ОУД.06 Физическая культура',
              room: '4',
              teacher: 'Арутюнов В.А.',
            },
          ],
        },
        4: {
          number: 5,
          lessons: [
            {
              name:
                'МДК.02.02 Инструментальные средства разработки программного обеспечения',
              room: '204',
              teacher: 'Заичкин Д.И.',
            },
            {
              name: '',
              room: '',
              teacher: '',
            },
            {
              name: '',
              room: '',
              teacher: '',
            },
          ],
        },
        5: {
          number: 6,
          lessons: [
            {
              name: '',
              room: '',
              teacher: '',
            },
            {
              name: '',
              room: '',
              teacher: '',
            },
            {
              name: 'ОГСЭ.05 Физическая культура',
              room: 'УО Техно',
              teacher: 'Арутюнов В.А.',
            },
          ],
        },
        6: {
          number: 7,
          lessons: [
            {
              name: '',
              room: '',
              teacher: '',
            },
            {
              name:
                'МДК.02.02 Инструментальные средства разработки программного обеспечения',
              room: '204',
              teacher: 'Заичкин Д.И.',
            },
            {
              name: 'МДК.11.01 Технология разработки и защиты баз данных',
              room: '311',
              teacher: 'Чмига М.А.',
            },
          ],
        },
        7: {
          number: 8,
          lessons: [
            {
              name: 'МДК 11.01 Технология разработки и защиты баз данных',
              room: '311',
              teacher: '',
            },
            {
              name: 'ОП.13 Основы информационной безопасности',
              room: '207',
              teacher: 'Задеба А.А.',
            },
            {
              name: 'ОП.13 Основы информационной безопасности',
              room: '207',
              teacher: 'Задеба А.А.',
            },
          ],
        },
      },
      timeTable: {
        Пустой: [],
        Понедельник: [
          {
            number: 1,
            type: 1,
            lessons: [
              { name: '', room: '', group: 1, parity: 'Каждая', teacher: '' },
              {
                name: 'МДК.02.03 Математическое моделирование',
                room: '301',
                group: 2,
                parity: 'Каждая',
                teacher: 'Кузьмина О.Б.',
              },
            ],
          },
          {
            number: 2,
            type: 0,
            lessons: [
              {
                name: 'МДК.04.01 Внедрение и поддержка компьютерных систем',
                room: '207',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Задеба А.А.',
              },
            ],
          },
          {
            number: 3,
            type: 0,
            lessons: [
              {
                name: 'МДК.02.03 Математическое моделирование',
                room: '301',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Кузьмина О.Б.',
              },
            ],
          },
          {
            number: 4,
            type: 0,
            lessons: [
              {
                name: 'МДК 11.01 Технология разработки и защиты баз данных',
                room: '311',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Чмига М.А.',
              },
            ],
          },
          {
            number: 5,
            type: 1,
            lessons: [
              {
                name: 'МДК.02.03 Математическое моделирование',
                room: '301',
                group: 1,
                parity: 'Каждая',
                teacher: 'Кузьмина О.Б.',
              },
              { name: '', room: '', group: 2, parity: 'Каждая', teacher: '' },
            ],
          },
        ],
        Вторник: [
          {
            number: 1,
            type: 1,
            lessons: [
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 1,
                parity: 'Каждая',
                teacher: 'Латыпова Е.В.',
              },
              { name: '', room: '', group: 2, parity: 'Каждая', teacher: '' },
            ],
          },
          {
            number: 2,
            type: 1,
            lessons: [
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 1,
                parity: 'Каждая',
                teacher: 'Латыпова Е.В.',
              },
              {
                name: 'ОГСЭ.05 Физическая культура',
                room: 'УО ТЕХНО',
                group: 2,
                parity: 'Каждая',
                teacher: 'Арутюнов В.А.',
              },
            ],
          },
          {
            number: 3,
            type: 1,
            lessons: [
              {
                name: 'ОГСЭ.05 Физическая культура',
                room: 'УО ТЕХНО',
                group: 1,
                parity: 'Каждая',
                teacher: 'Арутюнов В.А.',
              },
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 2,
                parity: 'Каждая',
                teacher: 'Латыпова Е.В.',
              },
            ],
          },
          {
            number: 4,
            type: 1,
            lessons: [
              { name: '', room: '', group: 1, parity: 'Каждая', teacher: '' },
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 2,
                parity: 'Каждая',
                teacher: 'Латыпова Е.В.',
              },
            ],
          },
          {
            number: 5,
            type: 0,
            lessons: [
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Каждая',
                teacher: '',
              },
            ],
          },
        ],
        Среда: [
          {
            number: 1,
            type: 1,
            lessons: [
              {
                name: 'МДК.02.03 Математическое моделирование',
                room: '301',
                group: 1,
                parity: 'Каждая',
                teacher: 'Кузьмина О.Б.',
              },
              {
                name: 'ОГСЭ.04 Иностранный язык',
                room: '305',
                group: 2,
                parity: 'Каждая',
                teacher: 'Аленичева С.В.',
              },
            ],
          },
          {
            number: 2,
            type: 0,
            lessons: [
              {
                name: 'МДК.11.01 Технология разработки и защиты баз данных',
                room: '311',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Чмига М.А.',
              },
            ],
          },
          {
            number: 3,
            type: 1,
            lessons: [
              {
                name: 'ОГСЭ.04 Иностранный язык',
                room: '305',
                group: 1,
                parity: 'Каждая',
                teacher: 'Аленичева С.В.',
              },
              {
                name: 'МДК.02.03 Математическое моделирование',
                room: '301',
                group: 2,
                parity: 'Каждая',
                teacher: 'Кузьмина О.Б.',
              },
            ],
          },
          {
            number: 4,
            type: 0,
            lessons: [
              {
                name: 'МДК.11.01 Технология разработки и защиты баз данных',
                room: '311',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Чмига М.А.',
              },
            ],
          },
          {
            number: 5,
            type: 0,
            lessons: [
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Каждая',
                teacher: '',
              },
            ],
          },
        ],
        Четверг: [
          {
            number: 1,
            type: 0,
            lessons: [
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Каждая',
                teacher: '',
              },
            ],
          },
          {
            number: 2,
            type: 0,
            lessons: [
              {
                name:
                  'МДК.04.02 Обеспечение качества функционирования компьютерных систем',
                room: '201',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Ситникова Ю.Н.',
              },
            ],
          },
          {
            number: 3,
            type: 0,
            lessons: [
              {
                name: 'ОП.06 Безопасность жизнедеятельности',
                room: '309',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Терехов В.В.',
              },
            ],
          },
          {
            number: 4,
            type: 0,
            lessons: [
              {
                name: 'ОП.06 Безопасность жизнедеятельности',
                room: '309',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Терехов В.В.',
              },
            ],
          },
          {
            number: 5,
            type: 2,
            lessons: [
              {
                name:
                  'МДК.04.02 Обеспечение качества функционирования компьютерных систем',
                room: '201',
                group: 'all',
                parity: 'Нечетная',
                teacher: 'Ситникова Ю.Н.',
              },
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Четная',
                teacher: '',
              },
            ],
          },
        ],
        Пятница: [
          {
            number: 1,
            type: 3,
            lessons: [
              {
                name:
                  'МДК.02.01 Технология разработки программного обеспечения',
                room: '301',
                group: 1,
                parity: 'Нечетная',
                teacher: 'Кузьмина О.Б.',
              },
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 2,
                parity: 'Нечетная',
                teacher: 'Латыпова Е.В.',
              },
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 1,
                parity: 'Четная',
                teacher: 'Латыпова Е.В.',
              },
              {
                name:
                  'МДК.02.01 Технология разработки программного обеспечения',
                room: '301',
                group: 2,
                parity: 'Четная',
                teacher: 'Кузьмина О.Б.',
              },
            ],
          },
          {
            number: 2,
            type: 0,
            lessons: [
              {
                name: 'ОП.07 Экономика отрасли',
                room: '407',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Носаченко Е.А.',
              },
            ],
          },
          {
            number: 3,
            type: 0,
            lessons: [
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 'all',
                parity: 'Каждая',
                teacher: 'Латыпова Е.В.',
              },
            ],
          },
          {
            number: 4,
            type: 2,
            lessons: [
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Нечетная',
                teacher: '',
              },
              {
                name:
                  'МДК.02.02 Инструментальные средства разработки программного обеспечения',
                room: '302',
                group: 'all',
                parity: 'Четная',
                teacher: 'Латыпова Е.В.',
              },
            ],
          },
          {
            number: 5,
            type: 0,
            lessons: [
              {
                name: '',
                room: '',
                group: 'all',
                parity: 'Каждая',
                teacher: '',
              },
            ],
          },
        ],
      },
    },
    templateDialog: false,
    splitsMenu: {
      show: false,
      x: 0,
      y: 0,
      number: 0,
      activeType: '',
    },
    inputData: {
      date: '',
    },
  }),
  mounted() {
    this.theme.value = localStorage.theme
  },
  methods: {
    testLog(text) {
      console.log(text)
    },
    testAlert(text) {
      alert(text)
    },
    showSplitsMenu(event) {
      event.event.preventDefault()
      //this.splitsMenu.show = false
      this.splitsMenu.x = event.event.clientX
      this.splitsMenu.y = event.event.clientY
      this.splitsMenu.number = event.index + 1
      this.splitsMenu.activeType = TimeTableUtil.getPairTypeFromNumber(
        event.item.type
      )
      !this.$nextTick(() => {
        this.splitsMenu.show = true
      })
    },
    changeTheme(value) {
      switch (value) {
        case 'light':
          this.$vuetify.theme.dark = false
          localStorage.theme = 'light'
          break
        case 'dark':
          this.$vuetify.theme.dark = true
          localStorage.theme = 'dark'
          break
        case 'system':
          localStorage.theme = 'system'
          if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
          ) {
            this.$vuetify.theme.dark = true
          } else {
            this.$vuetify.theme.dark = false
          }
          break
      }
    },
  },
}
</script>