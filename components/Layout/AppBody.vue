<template>
  <v-app :style="`background: ${$vuetify.theme.currentTheme.background1}`">
    <slot />

    <dialog-template v-model="loginDialog" title="Вход">
      <v-card-text>
        <v-form ref="form" @submit.prevent="login" lazy-validation>
          <password-field
            v-model="password"
            :rules="[(v) => !!v || 'Введите пароль']"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="login()"
          class="px-4"
          height="32"
          color="primary"
          style="text-transform: none"
          depressed
        >
          Войти
        </v-btn>
      </v-card-actions>
    </dialog-template>
  </v-app>
</template>

<script>
import {} from '@mdi/js'

export default {
  data: () => ({
    icons: {},
    password: '',
    loginDialog: false,
  }),
  beforeMount() {
    this.$meta().refresh()
    if (localStorage.theme === undefined) {
      localStorage.theme = 'system'
    }
    switch (localStorage.theme) {
      case 'light':
        this.$vuetify.theme.dark = false
        break
      case 'dark':
        this.$vuetify.theme.dark = true
        break
      case 'system':
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
        break
      default:
        break
    }
  },
  mounted() {
    this.loginDialog =
      !this.$store.state.auth.loggedIn && this.$store.state.auth.needAuth
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$auth
          .login({ password: this.password })
          .then((res) => {
            this.loginDialog = false
          })
          .catch((err) => {
            this.$notifier.showMessage({
              content: 'Неверный пароль',
              color: 'error',
            })
          })
      }
    },
  },
}
</script>

<style>
body::-webkit-scrollbar {
  width: 15px;
  height: 10px;
  background: var(--v-scrollBackground-base);
  border: 1px solid var(--v-scrollBorder-base);
}

body::-webkit-scrollbar-thumb {
  min-height: 28;
  background: var(--v-scrollThumbBackground-base);
  transition: 0.1s;
}

body::-webkit-scrollbar-thumb:hover {
  background: var(--v-scrollThumbBackgroundHover-base);
}

body::-webkit-scrollbar-thumb:active {
  background: var(--v-scrollThumbBackgroundActive-base);
}
</style>