import { createI18n } from 'vue-i18n'
import th from '../locales/th.json'
import en from '../locales/en.json'
export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: false,
        locale: 'th',
        messages: {
            th, en
        }
    })

    vueApp.use(i18n)
})