<template>
  <v-sheet
    height="100%"
    max-width="900"
    class="mx-auto pt-2 pb-2"
    color="background2"
  >
    <v-row class="px-2" no-gutters justify="center" align="center">
      <v-col>
        <span class="text-h4 font-weight-bold">Площадки</span>
      </v-col>
      <v-col cols="auto">
        <standart-button
          @click="subDivisionAddDialog.show = true"
          color="primary"
        >
          <v-icon left>{{ icons.mdiPlus }}</v-icon>
          <span>Добавить</span>
        </standart-button>
      </v-col>
    </v-row>

    <sub-divisions-grid
      :subDivisions="subDivisions"
      @deleteItem="
        confirmDialog = {
          show: true,
          data: {
            index: $event.index,
          },
        }
      "
      @updateItem="
        subDivisionUpdateDialog = {
          show: true,
          data: {
            index: $event.index,
            name: subDivisions[$event.index].name,
            password: subDivisions[$event.index].password,
          },
        }
      "
    />

    <dialog-template
      v-model="subDivisionAddDialog.show"
      title="Добавить площадку"
    >
      <v-card-text>
        <v-text-field
          v-model="subDivisionAddDialog.data.name"
          class="pb-2"
          label="Название площадки"
          dense
          hide-details="auto"
          outlined
        />
        <v-text-field
          v-model="subDivisionAddDialog.data.password"
          label="Пароль конструктора"
          dense
          hide-details="auto"
          outlined
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <cancel-button @click="subDivisionAddDialog.show = false">
          Отмена
        </cancel-button>
        <action-button @click="addSubDivision"> Добавить </action-button>
      </v-card-actions>
    </dialog-template>

    <dialog-template
      v-model="subDivisionUpdateDialog.show"
      title="Изменить площадку"
    >
      <v-card-text>
        <v-text-field
          v-model="subDivisionUpdateDialog.data.name"
          class="pb-2"
          label="Название площадки"
          dense
          hide-details="auto"
          outlined
        />
        <v-text-field
          v-model="subDivisionUpdateDialog.data.password"
          label="Пароль конструктора"
          dense
          hide-details="auto"
          outlined
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <cancel-button @click="subDivisionUpdateDialog.show = false">
          Отмена
        </cancel-button>
        <action-button @click="updateSubDivision"> Изменить </action-button>
      </v-card-actions>
    </dialog-template>

    <confirm-dialog
      v-model="confirmDialog.show"
      @confirm="deleteSubDivision"
      title="Удалить площадку"
      text="Вы уверенны, что хотите удалить площадку?"
      cancelText="Отмена"
      confirmText="Удалить"
    />
  </v-sheet>
</template>

<script>
import { mdiPlus, mdiTrashCan, mdiPencil } from '@mdi/js'

export default {
  layout: 'admin',
  middleware: 'auth',
  data: () => ({
    icons: { mdiPlus, mdiTrashCan, mdiPencil },
    subDivisionAddDialog: {
      show: false,
      data: {
        name: '',
        password: '',
      },
    },
    subDivisionUpdateDialog: {
      show: false,
      data: {
        index: -1,
        name: '',
        password: '',
      },
    },
    confirmDialog: {
      show: false,
      data: {
        index: -1,
      },
    },
    subDivisions: [],
  }),
  // Далее есть прикол
  // если loggedIn == false, то сначала должен показаться диалог входа
  // но asyncData выполнится раньше (особенности работы nuxt) в итоге страница отлетит с ошибкой 403
  // Поэтому если loggedIn == false то asyncData не выполняется
  // вместо него выполняется fetch если asyncData не сработал
  async asyncData({ $axios, store }) {
    if (store.state.auth.loggedIn) {
      const subDivisions = await $axios.$get(`/api/admin`)
      return { subDivisions, asyncDataWorked: true }
    }
  },
  async fetch() {
    if (!this.asyncDataWorked) {
      this.subDivisions = await this.$axios.$get(`/api/admin`)
    }
  },
  methods: {
    async addSubDivision() {
      await this.$axios
        .$post(`/api/admin`, {
          name: this.subDivisionAddDialog.data.name,
          password: this.subDivisionAddDialog.data.password,
        })
        .then((data) => {
          this.subDivisions.push(data)
          this.subDivisionAddDialog.show = false
          this.subDivisionAddDialog.data = {
            name: '',
            password: '',
          }
        })
    },
    async deleteSubDivision() {
      const id = this.subDivisions[this.confirmDialog.data.index].id
      await this.$axios.$delete(`/api/admin/${id}`).then((data) => {
        this.subDivisions.splice(this.confirmDialog.data.index, 1)
        this.confirmDialog = {
          show: false,
          data: {
            index: -1,
          },
        }
      })
    },
    async updateSubDivision() {
      const index = this.subDivisionUpdateDialog.data.index
      const id = this.subDivisions[index].id
      await this.$axios
        .$put(`/api/admin/${id}`, {
          name: this.subDivisionUpdateDialog.data.name,
          password: this.subDivisionUpdateDialog.data.password,
        })
        .then((data) => {
          this.subDivisions[index].name = data.name
          this.subDivisions[index].password = data.password
          this.subDivisionUpdateDialog = {
            show: false,
            data: {
              index: -1,
              name: '',
              password: '',
            },
          }
        })
    },
  },
}
</script>