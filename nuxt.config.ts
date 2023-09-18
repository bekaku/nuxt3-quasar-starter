// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
const devMode = process.env.NODE_ENV === 'development';
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  css: [
    '@/assets/css/custom.scss',
    '@/assets/css/typography.sass'
  ],
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: devMode
        ? 'http://127.0.0.1:8080'
        : 'https://api.supersynapse.net',
      cdnBaseUrl: devMode
        ? 'http://127.0.0.1:8080'
        : 'https://cdn.supersynapse.net',

      // apiBaseUrl: 'http://127.0.0.1:8080',
      // cdnBaseUrl: 'http://127.0.0.1:8080',

      // apiBaseUrl: 'https://api.supersynapse.net',
      // cdnBaseUrl: 'https://cdn.supersynapse.net',

      timeOut: 5 * 60000, // 60000 = 1 minute, 0 = no timeout
      feedPostPerPage: 3,
      commentsPerPage: 3,
      token: '',
      webAppUrl: 'https://app.supersynapse.net',
      appVersion: '1.1.2.1',
      codeVersion: 21,
      androidStoreLink:
        'https://play.google.com/store/apps/details?id=com.grandats.supersynapse',
      iOSStoreLink:
        'https://apps.apple.com/us/app/supersynapse/id6443715498?ls=1'
    }
  },
  // vite plugins
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
        ]
      })
    ],
    vue: {
      script: {
        defineModel: true
      }
    }
  },
  quasar: {
    lang: 'th',
    sassVariables: "@/assets/css/quasar.variables.scss",
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    iconSet: "bootstrap-icons",
    config: {
      // brand: {
      //   primary: "#00aba9",
      //   secondary: "#3273dc",
      //   accent: "#00d1b2",
      //   // dark: "#ff3860",
      //   positive: "#23d160",
      //   negative: "#ff3860",
      //   info: "#00a0dc",
      //   warning: "#ff9f43",
      // }
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  }
})
