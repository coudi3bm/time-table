<template>
  <dialog-template
    :value="value"
    title="Редактирование пары"
    :max-width="maxWidth"
  >
    <v-card-text>
      <ed-lesson
        v-if="type === 'Simple'"
        ref="lesson0"
        :value="lessons[0]"
        @change="setLesson($event, 0)"
      />

      <v-row v-if="type === 'Group'">
        <v-col cols="6">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Parity'">
        <v-col cols="12">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
          />
        </v-col>
        <v-col cols="12">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Group_Parity'">
        <v-col cols="6">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson2"
            :value="lessons[2]"
            @change="setLesson($event, 2)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson3"
            :value="lessons[3]"
            @change="setLesson($event, 3)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Parity_Left'">
        <v-col cols="6">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
            class="mb-6"
          />
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>

        <v-col cols="6" align-self="center">
          <ed-lesson
            ref="lesson2"
            :value="lessons[2]"
            @change="setLesson($event, 2)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Parity_Right'">
        <v-col cols="6" align-self="center">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
          />
        </v-col>

        <v-col cols="6">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
            class="mb-6"
          />
          <ed-lesson
            ref="lesson2"
            :value="lessons[2]"
            @change="setLesson($event, 2)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Group_Up'" justify="center">
        <v-col cols="6">
          <ed-lesson
            ref="lesson0"
            :value="lessons[0]"
            @change="setLesson($event, 0)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson2"
            :value="lessons[2]"
            @change="setLesson($event, 2)"
          />
        </v-col>
      </v-row>

      <v-row v-if="type === 'Group_Down'">
        <v-col cols="12">
          <v-row no-gutters justify="center">
            <v-col cols="6">
              <ed-lesson
                ref="lesson0"
                :value="lessons[0]"
                @change="setLesson($event, 0)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson1"
            :value="lessons[1]"
            @change="setLesson($event, 1)"
          />
        </v-col>
        <v-col cols="6">
          <ed-lesson
            ref="lesson2"
            :value="lessons[2]"
            @change="setLesson($event, 2)"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <cancel-button @click="$emit('input', false)"> Отмена </cancel-button>
      <action-button @click="saveEdit"> Сохранить </action-button>
    </v-card-actions>
  </dialog-template>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
    },
  },
  data: () => ({
    lessons: [],
  }),
  computed: {
    maxWidth() {
      if (this.type === 'Simple' || this.type === 'Parity') {
        return '400'
      } else {
        return '600'
      }
    },
  },
  watch: {
    items: function (newValue, oldValue) {
      this.lessons = newValue
    },
  },
  methods: {
    setLesson(event, index) {
      this.$set(this.lessons, index, {
        parity: this.lessons[index].parity,
        group: this.lessons[index].group,
        name: event.name,
        teacher: event.teacher,
        room: event.room,
      })
      console.log(this.lessons, event)
    },
    saveEdit() {
      // Необходимо вызвать blur на combobox чтобы сработало событие change и setLesson
      // Еще можно вообще все переделать и менять this.lessons прям здесь без обработки change с каждого EdLesson
      for (const index in this.lessons) {
        this.$refs[`lesson${index}`].$refs.name.blur()
        this.$refs[`lesson${index}`].$refs.teacher.blur()
      }

      this.$nextTick(() => {
        this.$emit('save-edit', this.lessons)
      })
    },
  },
}
</script>