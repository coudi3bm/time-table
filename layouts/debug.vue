<template>
  <app-body>
    <app-header title="Отладка" />

    <v-main class="ma-0">
      <nuxt />
    </v-main>

    <app-footer />

    <snackbar />
  </app-body>
</template>

<script>
export default {
  name: 'debug',
}
</script>