<template>
  <v-row class="mt-2 px-2" dense>
    <v-col
      cols="12"
      sm="6"
      lg="4"
      v-for="(subDivision, i) in subDivisions"
      :key="i"
    >
      <v-card
        rounded="lg"
        color="content"
        style="box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1)"
      >
        <v-card-title>
          <span class="text-truncate"> {{ subDivision.name }} </span>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <standart-button @click="$emit('deleteItem', { index: i })">
            <v-icon left>{{ icons.mdiTrashCan }}</v-icon>
            <span>Удалить</span>
          </standart-button>

          <standart-button @click="$emit('updateItem', { index: i })">
            <v-icon left>{{ icons.mdiPencil }}</v-icon>
            <span>Изменить</span>
          </standart-button>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiTrashCan, mdiPencil } from '@mdi/js'

export default {
  props: {
    subDivisions: {
      default: () => [],
      type: Array,
    },
  },
  data: () => ({
    icons: { mdiTrashCan, mdiPencil },
  }),
}
</script>

