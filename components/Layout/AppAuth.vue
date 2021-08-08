<template>
  <v-container
    class="pa-0"
    style="height: 100%"
    v-if="
      $store.state.auth.loggedIn === true ||
      $store.state.auth.needAuth === false
    "
  >
    <slot />
  </v-container>
</template>