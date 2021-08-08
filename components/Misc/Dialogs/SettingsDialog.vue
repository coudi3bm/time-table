<template>
  <v-dialog
    v-model="settingsDialog.show"
    fullscreen
    scrollable
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="toggleSettingsDialog(true)">
        <v-icon color="icon2">{{ icons.mdiCog }}</v-icon>
      </v-btn>
    </template>
    <v-card tile flat color="background2">
      <v-toolbar dense color="primary" elevation="2">
        <v-toolbar
          class="mx-auto toolbar"
          max-width="900"
          dense
          flat
          dark
          color="transparent"
        >
          <v-btn icon dark @click="toggleSettingsDialog(false)">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
          <v-toolbar-title class="pa-0 mx-2">Настройки</v-toolbar-title>
        </v-toolbar>
      </v-toolbar>

      <v-card-text class="pa-0" style="height: 100%">
        <v-sheet height="100%" max-width="900" class="mx-auto" color="content">
          <v-list subheader two-line color="content">
            <v-subheader>Основные</v-subheader>

            <dialog-template
              v-model="selectNameDialog.show"
              :title="`Выберите ${
                settingsType === 'group' ? 'группу' : 'учителя'
              }`"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ settingsType === 'group' ? 'Группа' : 'Учитель' }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ selectedName ? selectedName : 'Не выбрано' }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-card-text>
                <v-autocomplete
                  v-model="selectNameDialog.data.selectedName"
                  :label="settingsType === 'group' ? 'Группа' : 'Учитель'"
                  dense
                  :items="names"
                  no-data-text="Ничего не найдено"
                  hide-details="auto"
                  outlined
                />
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <cancel-button @click="selectNameDialog.show = false">
                  Отмена
                </cancel-button>
                <action-button @click="setSelectedName">
                  Выбрать
                </action-button>
              </v-card-actions>
            </dialog-template>

            <v-menu max-width="200" transition="scale-transition" rounded="lg">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item v-bind="attrs" v-on="on">
                  <v-list-item-content>
                    <v-list-item-title>Выбрать тему</v-list-item-title>
                    <v-list-item-subtitle>
                      <span v-if="themeValue === 'light'">
                        Сейчас выбрана светлая тема
                      </span>
                      <span v-else-if="themeValue === 'dark'">
                        Сейчас выбрана темная тема
                      </span>
                      <span v-else-if="themeValue === 'system'">
                        Сейчас выбрана системная тема
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list dense color="content">
                <v-list-item-group mandatory v-model="themeValue">
                  <v-list-item value="light">
                    <v-list-item-title>Светлая тема</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="dark">
                    <v-list-item-title>Темная тема</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="system">
                    <v-list-item-title>Системная тема</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-list>

          <v-divider></v-divider>

          <v-list flat subheader two-line color="content">
            <v-subheader> Фильтрация расписания </v-subheader>

            <v-list-item @click="scheduleFilterParity = !scheduleFilterParity">
              <v-list-item-content>
                <v-list-item-title>По четности</v-list-item-title>
                <v-list-item-subtitle style="white-space: normal !important">
                  Показывать расписание только для текущей четности недели
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-switch :input-value="scheduleFilterParity" dense />
              </v-list-item-action>
            </v-list-item>

            <v-menu max-width="200" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  :disabled="
                    !scheduleFilterParity || settingsType === 'teacher'
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title> По подгруппе </v-list-item-title>
                    <v-list-item-subtitle>
                      <span v-if="settingsType === 'group'">
                        {{
                          scheduleFilterSubgroup === 'all'
                            ? 'Любая'
                            : scheduleFilterSubgroup === '1'
                            ? '1 Подгруппа'
                            : '2 Подгруппа'
                        }}
                      </span>
                      <span
                        v-else-if="settingsType === 'teacher'"
                        style="white-space: normal !important"
                      >
                        Данная опция не доступна в расписании для учителей
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list dense color="content">
                <v-list-item-group mandatory v-model="scheduleFilterSubgroup">
                  <v-list-item value="all">
                    <v-list-item-title>Любая</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="1">
                    <v-list-item-title>1 Подгруппа</v-list-item-title>
                  </v-list-item>
                  <v-list-item value="2">
                    <v-list-item-title>2 Подгруппа</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </v-list>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiArrowLeft, mdiCog, mdiClose } from '@mdi/js'

export default {
  props: {
    settingsType: {
      default: '',
      type: String,
    },
  },
  data: () => ({
    icons: { mdiArrowLeft, mdiCog, mdiClose },
    settingsDialog: {
      show: false,
    },
    selectNameDialog: {
      show: false,
      data: {
        selectedName: '',
      },
    },
    names: [],
    themeValue: 'system',
  }),
  async fetch() {
    if (this.settingsType === 'group') {
      this.names = await this.$axios.$get(
        `/api/${this.$route.params.subDivision}/groups?onlyNames=true`
      )
    } else if (this.settingsType === 'teacher') {
      this.names = await this.$axios.$get(
        `/api/${this.$route.params.subDivision}/teachers?onlyNames=true`
      )
    }
  },
  computed: {
    scheduleFilterParity: {
      get() {
        return this.$store.state.settings.scheduleFilter.parity
      },
      set(value) {
        this.$store.commit('settings/setScheduleFilter', { parity: value })
      },
    },
    scheduleFilterSubgroup: {
      get() {
        return this.$store.state.settings.scheduleFilter.subgroup
      },
      set(value) {
        this.$store.commit('settings/setScheduleFilter', { subgroup: value })
      },
    },
    selectedName: {
      get() {
        return this.settingsType === 'group'
          ? this.$store.state.settings.selectedNames.group
          : this.$store.state.settings.selectedNames.teacher
      },
      set(value) {
        this.$store.commit(
          'settings/setSelectedNames',
          this.settingsType === 'group' ? { group: value } : { teacher: value }
        )
      },
    },
  },
  watch: {
    /*
    '$route.hash'(newHash, oldHash) {
      if (newHash === '#settingsDialog') {
        this.settingsDialog.show = true
      } else if (oldHash === '#settingsDialog') {
        this.settingsDialog.show = false
      }
    },
    */
    themeValue(newValue, oldValue) {
      switch (newValue) {
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
  created() {
    this.selectNameDialog.data.selectedName = this.selectedName
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (
        mutation.type === 'settings/setScheduleFilter' ||
        mutation.type === 'settings/setSelectedNames'
      ) {
        this.$cookies.set('settings', this.$store.state.settings, {
          path: '/',
          maxAge: 3600 * 24 * 7 * 4,
          sameSite: 'Lax',
        })
      }
    })
  },
  mounted() {
    this.themeValue = localStorage.theme
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    toggleSettingsDialog(open) {
      this.settingsDialog.show = open
      /*
      if (open) {
        this.$router.push('#settingsDialog')
      } else {
       this.$router.back()
      }
      */
    },
    setSelectedName() {
      this.selectNameDialog.show = false
      this.selectedName = this.selectNameDialog.data.selectedName
    },
  },
}
</script>