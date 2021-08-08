<template>
  <v-list-item>
    <div
      v-if="item === editItem.data.oldValue"
      class="d-flex py-1"
      style="flex-wrap: wrap; flex: 1 1"
    >
      <v-text-field
        v-model="editItem.data.newValue"
        spellcheck="false"
        autofocus
        single-line
        dense
        hide-details="auto"
        @keyup.enter="saveEdit"
      />
      <v-list-item-action class="ma-0">
        <v-btn icon small @click="saveEdit">
          <v-icon small>{{ icons.mdiCheck }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </div>
    <div v-else class="d-flex" style="flex-wrap: wrap; flex: 1 1">
      <v-list-item-content>{{ item }}</v-list-item-content>
      <v-list-item-action class="ma-0">
        <v-btn icon small @click="$emit('remove', item)">
          <v-icon small>{{ icons.mdiTrashCan }}</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action class="ma-0">
        <v-btn icon small @click="openEdit(item)">
          <v-icon small>{{ icons.mdiPencil }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </div>
  </v-list-item>
</template>

<script>
import { mdiTrashCan, mdiPencil, mdiCheck } from '@mdi/js'

export default {
  props: {
    item: String,
  },

  data: () => ({
    icons: { mdiTrashCan, mdiPencil, mdiCheck },
    editItem: {
      data: {
        oldValue: '',
        newValue: '',
      },
    },
  }),
  methods: {
    openEdit(item) {
      this.editItem.data = {
        oldValue: item,
        newValue: item,
      }
    },
    saveEdit() {
      if (this.editItem.data.newValue) {
        this.$emit('update', {
          oldValue: this.editItem.data.oldValue,
          newValue: this.editItem.data.newValue,
        })
      } else {
        this.$emit('remove', this.editItem.data.oldValue)
      }
      this.editItem.data = {
        oldValue: '',
        newValue: '',
      }
    },
  },
}
</script>