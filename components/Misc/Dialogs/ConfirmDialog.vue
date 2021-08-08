<template>
  <dialog-template :value="value" :title="title">
    <v-card-text>
      {{ text }}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <cancel-button @click="$emit('input', false)">
        {{ cancelText }}
      </cancel-button>
      <action-button @click="$emit('confirm')">
        {{ confirmText }}
      </action-button>
    </v-card-actions>
  </dialog-template>
</template>

<script>
export default {
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '',
      type: String,
    },
    text: {
      default: '',
      type: String,
    },
    cancelText: {
      default: '',
      type: String,
    },
    confirmText: {
      default: '',
      type: String,
    },
  },
}
</script>