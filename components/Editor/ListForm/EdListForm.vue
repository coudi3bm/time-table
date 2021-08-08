<template>
  <v-card color="content" style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)" rounded="lg">
    <v-card-title> {{ title }} </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="query"
        @keyup.enter="
          query ? $emit('add', query) : null
          query = ''
        "
        placeholder="Поиск"
        dense
        hide-details="auto"
        outlined
        clearable
        :clear-icon="icons.mdiClose"
      />
    </v-card-text>
    <v-sheet color="content2" height="400" style="overflow-y: auto">
      <ed-list
        v-if="filteredItems.length > 0"
        @update="$emit('update', $event)"
        @remove="$emit('remove', $event)"
        :items="filteredItems"
      />
      <p v-else class="text-center px-2">
        Введение значение в поле поиск и <br />
        нажмите <kbd>enter</kbd> чтобы добавить
      </p>
    </v-sheet>
  </v-card>
</template>

<script>
import { mdiTrashCan, mdiPencil, mdiPlus, mdiClose } from '@mdi/js'

export default {
  props: {
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    icons: { mdiTrashCan, mdiPencil, mdiPlus, mdiClose },
    query: '',
  }),
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          item
            .toLowerCase()
            .indexOf(this.query ? this.query.toLowerCase() : '') > -1
      )
    },
  },
  methods: {},
}
</script>