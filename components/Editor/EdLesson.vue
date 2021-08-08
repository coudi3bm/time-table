<template>
  <v-row dense>
    <v-col cols="8">
      <v-combobox
        ref="name"
        v-model="name"
        @change="change"
        :items="$store.state.db.lessons.list"
        label="Предмет"
        dense
        outlined
        hide-details="auto"
      >
        <template v-slot:item="{ item }">
          <v-sheet width="300" class="py-2">
            <span class="caption font-weight-medium">{{ item }}</span>
          </v-sheet>
        </template>
      </v-combobox>
    </v-col>
    <v-col cols="4">
      <v-text-field
        v-model="room"
        @change="change"
        label="Кабинет"
        dense
        outlined
        hide-details="auto"
      />
    </v-col>
    <v-col cols="12">
      <v-combobox
        ref="teacher"
        v-model="teacher"
        @change="change"
        :items="$store.state.db.teachers.list"
        label="ФИО Учителя"
        dense
        outlined
        hide-details="auto"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return { name: '', teacher: '', room: '' }
      },
    },
  },
  data: (context) => ({
    name: context.value.name,
    teacher: context.value.teacher,
    room: context.value.room,
  }),
  watch: {
    value: function (newValue, oldValue) {
      this.name = newValue.name
      this.teacher = newValue.teacher
      this.room = newValue.room
    },
  },
  methods: {
    change() {
      this.$emit('change', {
        name: this.name,
        teacher: this.teacher,
        room: this.room,
      })
    },
  },
}
</script>