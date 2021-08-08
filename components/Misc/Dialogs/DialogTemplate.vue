<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    eager
    persistent
    content-class="rounded-dialog"
    :max-width="maxWidth"
    overlay-color="black"
    overlay-opacity="0.5"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" v-bind:on="on" />
    </template>
    <v-card color="content" class="rounded-lg" flat>
      <v-card-title class="text-h6" style="word-break: keep-all">
        {{ title }}
      </v-card-title>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: String,
      default: '400',
    },
  },
}
</script>