<template>
  <app-body>
    <app-header title="Панель админа" />

    <v-main class="ma-0">
      <app-auth>
        <nuxt />
      </app-auth>
    </v-main>

    <app-footer />

    <snackbar />
  </app-body>
</template>

<script>
export default {
  name: 'admin',
}
</script>