<template>
  <tt-cell>{{ getLesson(lesson) }}</tt-cell>
</template>

<script>
import TimeTableUtil from '~/utils/time-table'

export default {
  props: ['lesson'],
  methods: {
    getLesson(lesson) {
      return TimeTableUtil.getLesson(lesson)
    },
  },
}
</script>