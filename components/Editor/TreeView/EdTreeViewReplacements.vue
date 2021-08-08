<template>
  <v-card
    color="content"
    style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
    rounded="lg"
  >
    <v-card-title> Замены </v-card-title>
    <v-sheet color="content2" height="300" style="overflow-y: auto">
      <ed-tree-view
        @click="$emit('click', { ...$event, type: 'replacements' })"
        :items="$store.state.db.replacements.groups"
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

    <dialog-template v-model="addDialog.show" title="Добавить замены">
      <v-card-text>
        <v-text-field
          v-model="addDialog.data.group"
          class="pb-2"
          label="Группа"
          dense
          hide-details="auto"
          outlined
        />
        <date-field
          v-model="addDialog.data.dates"
          multiple
          label="Даты замен"
          :allowDates="allowDates"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <cancel-button @click="addDialog.show = false"> Отмена </cancel-button>
        <action-button @click="add"> Добавить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template v-model="removeDialog.show" title="Удалить замены">
      <v-card-text>
        <v-autocomplete
          v-model="removeDialog.data.group"
          class="pb-2"
          label="Группа"
          dense
          outlined
          hide-details="auto"
          no-data-text="Ничего не найдено"
          :items="Object.keys($store.state.db.replacements.groups)"
        />
        <date-field
          v-model="removeDialog.data.dates"
          multiple
          label="Даты замен"
          :allowDates="allowDates"
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
        dates: [],
      },
    },
    removeDialog: {
      show: false,
      data: {
        group: '',
        dates: [],
      },
    },
  }),
  methods: {
    add() {
      if (this.addDialog.data.group && this.addDialog.data.dates.length > 0) {
        this.$store.commit('db/replacements/add', {
          groupName: this.addDialog.data.group,
          dates: this.addDialog.data.dates,
          groupReplacements: TimeTableUtil.createDay(6),
        })
        this.addDialog.show = false
        this.addDialog.data = {
          group: '',
          dates: [],
        }
      }
    },
    remove() {
      if (
        this.removeDialog.data.group &&
        this.removeDialog.data.dates.length > 0
      ) {
        this.$store.commit('db/replacements/remove', {
          groupName: this.removeDialog.data.group,
          dates: this.removeDialog.data.dates,
        })
        this.removeDialog.show = false
        this.removeDialog.data = {
          group: '',
          dates: [],
        }
      }
    },
    allowDates(value) {
      const dates = (value) => {
        if (value && value in this.$store.state.db.replacements.groups) {
          return this.$store.state.db.replacements.groups[value]
        } else {
          return {}
        }
      }
      if (this.addDialog.show) {
        return !(value in dates(this.addDialog.data.group))
      } else if (this.removeDialog.show) {
        return value in dates(this.removeDialog.data.group)
      }
    },
  },
}
</script>