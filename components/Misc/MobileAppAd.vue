<template>
  <client-only>
    <v-bottom-sheet
      v-model="show"
      persistent
      inset
      content-class="rounded-dialog"
      max-width="600"
      color="content"
      overlay-color="black"
      overlay-opacity="0.5"
      width="600"
    >
      <v-card color="content" class="rounded-t-lg" flat tile>
        <v-card-title
          class="text-h6 px-3 justify-center"
          style="word-break: keep-all"
        >
          Смотрите расписание в...
        </v-card-title>
        <v-divider />
        <v-card-text style="color: inherit" class="px-3 py-2">
          <v-row dense align="center">
            <v-col cols="auto">
              <v-img
                src="/favicon.svg"
                height="50"
                max-width="50"
                contain
                eager
              />
            </v-col>
            <v-col>
              <span class="font-weight-medium">Приложении</span>
            </v-col>
            <v-col class="text-right">
              <v-btn
                class="px-4 rounded-pill"
                color="primary"
                style="text-transform: none"
                depressed
                width="125"
              >
                Открыть
              </v-btn>
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col cols="auto">
              <v-img
                :src="browserIcon"
                height="50"
                max-width="50"
                contain
                eager
              />
            </v-col>
            <v-col>
              <span class="font-weight-medium">{{ this.browserName }}</span>
            </v-col>
            <v-col class="text-right">
              <v-btn
                @click="show = false"
                class="px-4 rounded-pill"
                style="text-transform: none"
                depressed
                width="125"
              >
                Продолжить
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <slot />
      </v-card>
    </v-bottom-sheet>
  </client-only>
</template>

<script>
import ClientInfo from '~/utils/client-info'

export default {
  data: () => ({
    show: false,
    browserName: '',
  }),
  computed: {
    browserIcon() {
      if (this.browserName === 'Chrome') {
        return '/BrowsersLogos/chrome.svg'
      } else if (this.browserName === 'Safari') {
        return '/BrowsersLogos/safari.svg'
      } else if (this.browserName === 'Firefox') {
        return '/BrowsersLogos/firefox.svg'
      } else if (this.browserName === 'Edge') {
        return '/BrowsersLogos/edge.svg'
      } else {
        return '/BrowsersLogos/chrome.svg'
      }
    },
  },
  // Без <client-only> нужно заменить на mounted
  beforeMount() {
    this.browserName = ClientInfo.browserName
    this.show = ClientInfo.platform.isMobile
  },
}
</script>