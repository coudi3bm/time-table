<template>
  <app-body>
    <app-header
      title="Расписание учителя"
      :back="`/${$route.params.subDivision}`"
    >
      <template v-slot:action-buttons>
        <settings-dialog settings-type="teacher" />
      </template>
    </app-header>

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
  name: 'teacher',
}
</script>