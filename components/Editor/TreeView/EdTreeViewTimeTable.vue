<template>
  <v-card
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    rounded="lg"
  >
    <v-card-title> Расписание </v-card-title>
    <v-sheet color="content2" height="300" style="overflow-y: auto">
      <ed-tree-view
        @click="$emit('click', { ...$event, type: 'timeTable' })"
        :items="$store.state.db.timeTable.groups"
        :active="active"
      />
    </v-sheet>
    <v-card-actions>
      <v-row dense>
        <v-col
          cols="6"
          sm="12"
          md="6"
          order="first"
          order-sm="last"
          order-md="first"
        >
          <standart-button block @click="removeDialog.show = true">
            <v-icon left>
              {{ icons.mdiTrashCan }}
            </v-icon>
            Удалить
          </standart-button>
        </v-col>
        <v-col cols="6" sm="12" md="6">
          <standart-button block @click="addDialog.show = true">
            <v-icon left>
              {{ icons.mdiPlus }}
            </v-icon>
            Добавить
          </standart-button>
        </v-col>
      </v-row>
    </v-card-actions>

    <dialog-template v-model="addDialog.show" title="Добавить группу">
      <v-card-text>
        <v-text-field
          v-model="addDialog.data.group"
          label="Группа"
          dense
          hide-details="auto"
          outlined
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="addDialog.show = false"> Отмена </cancel-button>
        <action-button @click="add"> Добавить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template v-model="removeDialog.show" title="Удалить группы">
      <v-card-text>
        <v-autocomplete
          v-model="removeDialog.data.groups"
          label="Группы"
          dense
          outlined
          multiple
          small-chips
          hide-details="auto"
          no-data-text="Ничего не найдено"
          :items="Object.keys($store.state.db.timeTable.groups)"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="removeDialog.show = false">
          Отмена
        </cancel-button>
        <action-button @click="remove"> Удалить </action-button>
      </v-card-actions>
    </dialog-template>
  </v-card>
</template>

<script>
import { mdiTrashCan, mdiPlus } from '@mdi/js'
import TimeTableUtil from '~/utils/time-table'
import DateUtil from '~/utils/date-util'

export default {
  props: {
    active: {
      default: () => [],
      type: Array,
    },
  },
  data: () => ({
    icons: { mdiTrashCan, mdiPlus },
    addDialog: {
      show: false,
      data: {
        group: '',
      },
    },
    removeDialog: {
      show: false,
      data: {
        groups: [],
      },
    },
  }),
  methods: {
    add() {
      if (this.addDialog.data.group) {
        const days = DateUtil.getDaysOfWeekTo('Пятница')
        this.$store.commit('db/timeTable/add', {
          groupName: this.addDialog.data.group,
          groupTimeTable: TimeTableUtil.createGroup(days),
        })
        this.addDialog.show = false
        this.addDialog.data = {
          group: '',
        }
      }
    },
    remove() {
      if (this.removeDialog.data.groups.length > 0) {
        for (const groupName of this.removeDialog.data.groups) {
          this.$store.commit('db/timeTable/remove', groupName)
        }
        this.removeDialog.show = false
        this.removeDialog.data = {
          groups: [],
        }
      }
    },
  },
}
</script>