<template>
  <app-body>
    <app-header :title="$route.params.subDivision" />

    <v-main class="ma-0">
      <app-auth>
        <nuxt />
      </app-auth>
    </v-main>

    <app-footer mode="subDivision" />

    <snackbar />
  </app-body>
</template>

<script>
export default {
  name: 'subDivision',
}
</script>