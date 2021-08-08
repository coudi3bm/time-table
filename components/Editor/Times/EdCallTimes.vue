<template>
  <v-card
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    rounded="lg"
  >
    <v-card-title>
      <v-row class="px-2" no-gutters justify="center" align="center">
        <v-col>
          <span>Звонки</span>
        </v-col>
        <v-col cols="auto">
          <standart-button @click="addDialog.show = true">
            <v-icon left>{{ icons.mdiPlus }}</v-icon>
            <span>Добавить</span>
          </standart-button>
        </v-col>
      </v-row>
    </v-card-title>
    <v-sheet rounded="b-lg" color="content2" style="overflow-y: auto">
      <v-card-text>
        <v-row dense>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(item, i) in $store.state.db.callTimes.list"
            :key="i"
          >
            <call-times-table
              @click="
                editDialog = {
                  show: true,
                  data: {
                    callsIndex: i,
                    index: $event.index,
                    calls: JSON.parse(JSON.stringify($event.calls)),
                  },
                }
              "
              :callTimes="item.calls"
              :lunchTimes="{ start: '', end: '' }"
            >
              <template v-slot:title>
                <v-chip
                  small
                  v-for="(group, i) in item.groups"
                  :key="i"
                  class="mr-1 mt-1"
                >
                  {{ group }}
                </v-chip>
              </template>

              <template v-slot:actions>
                <v-card-actions>
                  <v-spacer />
                  <standart-button
                    @click="
                      confirmDialog = {
                        show: true,
                        data: {
                          index: i,
                        },
                      }
                    "
                  >
                    <v-icon left>{{ icons.mdiTrashCan }}</v-icon>
                    <span>Удалить</span>
                  </standart-button>
                  <standart-button
                    @click="
                      updateDialog = {
                        show: true,
                        data: {
                          index: i,
                          groups: item.groups,
                          calls: item.calls,
                        },
                      }
                    "
                  >
                    <v-icon left>{{ icons.mdiPencil }}</v-icon>
                    <span>Изменить</span>
                  </standart-button>
                </v-card-actions>
              </template>
            </call-times-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-sheet>

    <dialog-template
      v-model="addDialog.show"
      title="Добавить расписание звонков"
    >
      <v-card-text>
        <v-combobox
          v-model="addDialog.data.groups"
          multiple
          small-chips
          label="Группы"
          outlined
          hide-details="auto"
          no-data-text="Ничего не найдено"
          :items="Object.keys($store.state.db.timeTable.groups)"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="addDialog.show = false"> Отмена </cancel-button>
        <action-button @click="add"> Добавить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template
      v-model="updateDialog.show"
      title="Изменить расписание звонков"
    >
      <v-card-text>
        <v-combobox
          v-model="updateDialog.data.groups"
          multiple
          small-chips
          class="pb-2"
          label="Группы"
          outlined
          hide-details="auto"
          no-data-text="Ничего не найдено"
          :items="Object.keys($store.state.db.timeTable.groups)"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="updateDialog.show = false">
          Отмена
        </cancel-button>
        <action-button @click="update"> Изменить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template v-model="editDialog.show" title="Изменить время звонка">
      <v-card-text>
        <v-row v-if="Array.isArray(editDialog.data.calls)" dense>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls[0].start"
              label="Начало"
              dense
            />
          </v-col>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls[0].end"
              label="Начало"
              dense
            />
          </v-col>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls[1].start"
              label="Начало"
              dense
            />
          </v-col>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls[1].end"
              label="Начало"
              dense
            />
          </v-col>
        </v-row>
        <v-row dense v-else>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls.start"
              label="Начало"
              dense
            />
          </v-col>
          <v-col cols="6">
            <time-field
              v-model="editDialog.data.calls.end"
              label="Начало"
              dense
            />
          </v-col>
        </v-row>
        <v-checkbox
          label="Разделить попалам"
          :value="Array.isArray(editDialog.data.calls)"
          hide-details="auto"
          @change="
            $event
              ? (editDialog.data.calls = [
                  { start: '', end: '' },
                  { start: '', end: '' },
                ])
              : (editDialog.data.calls = { start: '', end: '' })
          "
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="editDialog.show = false"> Отмена </cancel-button>
        <action-button @click="edit"> Изменить </action-button>
      </v-card-actions>
    </dialog-template>

    <confirm-dialog
      v-model="confirmDialog.show"
      @confirm="remove"
      title="Удалить расписание звонков"
      text="Вы уверенны, что хотите расписание звонков?"
      cancelText="Отмена"
      confirmText="Удалить"
    />
  </v-card>
</template>

<script>
import { mdiPlus, mdiClockOutline, mdiPencil, mdiTrashCan } from '@mdi/js'

export default {
  data: () => ({
    icons: { mdiPlus, mdiClockOutline, mdiPencil, mdiTrashCan },
    addDialog: {
      show: false,
      data: {
        groups: [],
      },
    },
    updateDialog: {
      show: false,
      data: {
        groups: [],
        calls: [],
      },
    },
    editDialog: {
      show: false,
      data: {
        callsIndex: 0,
        index: 0,
        calls: {
          start: '',
          end: '',
        },
      },
    },
    confirmDialog: {
      show: false,
      data: {
        index: -1,
      },
    },
  }),
  methods: {
    add() {
      if (this.addDialog.data.groups.length > 0) {
        this.$store.commit('db/callTimes/add', {
          groups: this.addDialog.data.groups,
          calls: [
            { start: '', end: '' },
            { start: '', end: '' },
            { start: '', end: '' },
            { start: '', end: '' },
            { start: '', end: '' },
          ],
        })
        this.addDialog.show = false
        this.addDialog.data = {
          groups: [],
        }
      }
    },
    update() {
      this.$store.commit('db/callTimes/update', {
        index: this.updateDialog.data.index,
        value: {
          groups: this.updateDialog.data.groups,
          calls: this.updateDialog.data.calls,
        },
      })
      this.updateDialog.show = false
      this.updateDialog.data = {
        index: 0,
        groups: [],
        calls: [],
      }
    },
    edit() {
      this.$store.commit('db/callTimes/updateCalls', {
        callsIndex: this.editDialog.data.callsIndex,
        index: this.editDialog.data.index,
        value: this.editDialog.data.calls,
      })
      this.editDialog.show = false
      this.editDialog.data = {
        index: 0,
        groups: [],
        calls: { start: '', end: '' },
      }
    },
    remove() {
      this.$store.commit('db/callTimes/remove', {
        index: this.confirmDialog.data.index,
      })
      this.confirmDialog.show = false
    },
  },
}
</script>

<style scoped>
.input-time-fix ::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
</style>