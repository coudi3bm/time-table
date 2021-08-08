<template>
  <app-body>
    <app-header />

    <v-main class="ma-0">
      <app-auth>
        <nuxt />
      </app-auth>
    </v-main>

    <app-footer mode="version" />

    <snackbar />
  </app-body>
</template>

<script>
export default {
  name: 'default',
}
</script>