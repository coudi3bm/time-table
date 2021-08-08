<template>
  <tt-card :flat="flat">
    <tt-header :day="day" />
    <div v-if="items.length > 0">
      <div
        v-for="(item, i) in items"
        :key="i"
        @contextmenu="
          $emit('contextmenu', { event: $event, index: i, item: item })
        "
      >
        <v-sheet
          class="mx-2"
          color="primary rounded-t-lg"
          height="4"
          v-if="currentPairNumber === item.number"
        />
        <tt-split-simple
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 0"
        />
        <tt-split-group
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 1"
        />
        <tt-split-parity
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 2"
        />
        <tt-split-group-parity
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 3"
        />
        <tt-split-parity-left
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 4"
        />
        <tt-split-parity-right
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 5"
        />
        <tt-split-group-up
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 6"
        />
        <tt-split-group-down
          :rounded="items.length - 1 === i"
          :pair="item"
          v-if="item.type === 7"
        />
      </div>
    </div>
    <div
      v-else
      class="text-h6 font-weight-thin text-center ma-0 px-2 pb-2"
      style="overflow-wrap: break-word"
    >
      <tt-cell class="rounded-b-lg"> Ничего нет </tt-cell>
    </div>
  </tt-card>
</template>

<script>
export default {
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    day: String,
    items: Array,
    currentPairNumber: Number,
  },
}
</script>