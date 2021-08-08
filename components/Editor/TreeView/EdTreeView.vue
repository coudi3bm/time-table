<template>
  <v-treeview
    :dark="theme"
    return-object
    dense
    activatable
    open-on-click
    @update:active="selectDay"
    :active="active"
    :items="treeViewItems"
  />
</template>

<script>
export default {
  props: {
    items: {
      default: () => {},
      type: Object,
    },
    active: {
      default: () => [],
      type: Array,
    },
  },
  data: () => ({
    theme: false,
  }),
  computed: {
    treeViewItems() {
      const treeViewItems = []
      let i = 0
      for (const group in this.items) {
        const children = []
        for (const day in this.items[group]) {
          children.push({ id: ++i, from: group, name: day })
        }
        treeViewItems.push({
          id: ++i,
          name: group,
          children: children,
        })
      }
      return treeViewItems
    },
  },
  mounted() {
    this.theme = this.$vuetify.theme.dark
  },
  methods: {
    selectDay(event) {
      if (event.length > 0) {
        this.$emit('click', {
          group: event[0].from,
          day: event[0].name,
          event: event,
        })
      }
    },
  },
}
</script>