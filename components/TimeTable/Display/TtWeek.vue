<template>
  <div>
    <tt-day
      v-for="(day, i) in items"
      :items="day"
      :key="i"
      :day="i"
      class="mb-4"
    />
  </div>
</template>

<script>
import { objIsEmpty } from '~/utils/index'

export default {
  props: {
    items: Object,
  },
  methods: {
    objIsEmpty,
  },
}
</script>