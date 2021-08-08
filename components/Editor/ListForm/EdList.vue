<template>
  <v-list dense color="transparent">
    <div v-for="(item, i) in items" :key="i">
      <v-divider />
      <ed-list-item
        :item="item"
        @update="$emit('update', $event)"
        @remove="$emit('remove', $event)"
      />
    </div>
  </v-list>
</template>

<script>
import {} from '@mdi/js'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    icons: {},
  }),
}
</script>