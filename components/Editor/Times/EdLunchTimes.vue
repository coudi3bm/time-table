<template>
  <v-card
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    rounded="lg"
  >
    <v-card-title>
      <v-row class="px-2" no-gutters justify="center" align="center">
        <v-col>
          <span>Время обеда</span>
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
            v-for="(item, i) in $store.state.db.lunchTimes.list"
            :key="i"
          >
            <v-card
              style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
              color="content"
              rounded="lg"
            >
              <v-card-title>
                <v-chip
                  small
                  v-for="(group, i) in item.groups"
                  :key="i"
                  class="mr-1 mt-1"
                  disabled
                >
                  {{ group }}
                </v-chip>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="6">
                    <time-field
                      :value="item.start"
                      label="Начало"
                      dense
                      disabled
                    />
                  </v-col>
                  <v-col cols="6">
                    <time-field
                      :value="item.end"
                      label="Конец"
                      dense
                      disabled
                    />
                  </v-col>
                </v-row>
              </v-card-text>

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
                        start: item.start,
                        end: item.end,
                      },
                    }
                  "
                >
                  <v-icon left>{{ icons.mdiPencil }}</v-icon>
                  <span>Изменить</span>
                </standart-button>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-sheet>

    <dialog-template v-model="addDialog.show" title="Добавить время обеда">
      <v-card-text>
        <v-combobox
          v-model="addDialog.data.groups"
          multiple
          small-chips
          class="pb-2"
          label="Группы"
          outlined
          hide-details="auto"
          no-data-text="Ничего не найдено"
          :items="Object.keys($store.state.db.timeTable.groups)"
        />

        <v-row dense>
          <v-col cols="6">
            <time-field v-model="addDialog.data.start" label="Начало" dense />
          </v-col>
          <v-col cols="6">
            <time-field v-model="addDialog.data.end" label="Конец" dense />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="addDialog.show = false"> Отмена </cancel-button>
        <action-button @click="add"> Добавить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template v-model="updateDialog.show" title="Изменить время обеда">
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

        <v-row dense>
          <v-col cols="6">
            <time-field
              v-model="updateDialog.data.start"
              label="Начало"
              dense
            />
          </v-col>
          <v-col cols="6">
            <time-field v-model="updateDialog.data.end" label="Конец" dense />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="updateDialog.show = false">
          Отмена
        </cancel-button>
        <action-button @click="update"> Изменить </action-button>
      </v-card-actions>
    </dialog-template>

    <confirm-dialog
      v-model="confirmDialog.show"
      @confirm="remove"
      title="Удалить обед"
      text="Вы уверенны, что хотите удалить обед?"
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
        start: '',
        end: '',
      },
    },
    updateDialog: {
      show: false,
      data: {
        index: 0,
        groups: [],
        start: '',
        end: '',
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
        this.$store.commit('db/lunchTimes/add', {
          groups: this.addDialog.data.groups,
          start: this.addDialog.data.start,
          end: this.addDialog.data.end,
        })
        this.addDialog.show = false
        this.addDialog.data = {
          groups: [],
          start: '',
          end: '',
        }
      }
    },
    update() {
      this.$store.commit('db/lunchTimes/update', {
        index: this.updateDialog.data.index,
        value: {
          groups: this.updateDialog.data.groups,
          start: this.updateDialog.data.start,
          end: this.updateDialog.data.end,
        },
      })
      this.updateDialog.show = false
      this.updateDialog.data = {
        index: 0,
        groups: [],
        start: '',
        end: '',
      }
    },
    remove() {
      this.$store.commit('db/lunchTimes/remove', {
        index: this.confirmDialog.data.index,
      })
      this.confirmDialog.show = false
    },
  },
}
</script>