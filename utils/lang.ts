import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
import { useLangugeAndThemeStore } from '@/stores/langugeAndThemeStore';
import { LocaleKey, DefaultLocale, ExpireCookieDays } from '@/utils/constant';
import { addDateByDays } from '@/utils/dateUtil';
import { ILocales } from '@/types/common';

export const availableLocales: ILocales[] = [
  {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  {
    name: 'ไทย',
    iso: 'th',
    flag: 'TH',
  },
];

export const LanguageManager = () => {

  const localeCookie = useCookie(LocaleKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();
  const { locale } = useI18n();
  const getUserLocale = (): string => localeCookie.value || DefaultLocale;

  // watchers
  watch(langugeAndThemeStore, (state) => {
    if (state.locale) {
      setLocale(state.locale);
    }
  });

  const setLocale = (lang: string) => {
    localeCookie.value = lang;
    locale.value = lang;
    langugeAndThemeStore.setLocale(lang);
  };

  // init locale
  const initLang = () => {
    const locale = getUserLocale();
    setLocale(locale);
  };

  // lifecycle
  // onBeforeMount(() => initLang());

  return {
    initLang,
  };
};
