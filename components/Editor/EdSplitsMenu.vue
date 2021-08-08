<template>
  <v-menu
    @input="$emit('input', $event)"
    :value="value"
    :position-x="x"
    :position-y="y"
    max-width="200"
    rounded="lg"
  >
    <v-list dense color="content">
      <v-subheader class="d-block">
        <div>Тип разделения</div>
        <div>Пара номер: {{ number }}</div>
      </v-subheader>
      <v-list-item-group mandatory :value="activeType">
        <v-list-item
          @click="$emit('click', item.value)"
          v-for="(item, i) in splits"
          :key="i"
          :value="item.value"
        >
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    activeType: '',
    value: Boolean,
    number: Number,
    x: Number,
    y: Number,
  },
  data: () => ({
    splits: [
      { text: 'Одно', value: 'Simple' },
      { text: 'Группа', value: 'Group' },
      { text: 'Четность', value: 'Parity' },
      { text: 'Группа + Четность', value: 'Group_Parity' },
      { text: 'Группа 1 + Четность', value: 'Parity_Left' },
      { text: 'Группа 2 + Четность', value: 'Parity_Right' },
      { text: 'Группа + НЧ', value: 'Group_Up' },
      { text: 'Группа + Ч', value: 'Group_Down' },
    ],
  }),
}
</script>