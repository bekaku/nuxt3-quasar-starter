import {
  watch,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue';
import { IThemeSettingOptions, ITheme } from '@/types/common';
import { useLangugeAndThemeStore } from '@/stores/langugeAndThemeStore';
import { ThemeKey, ExpireCookieDays } from '@/utils/constant';
import { addDateByDays } from '@/utils/dateUtil';
import {
  biLaptop,
  biSun,
  biMoon,
  biClock,
} from '@quasar/extras/bootstrap-icons';
export const availableThemes: {
  key: IThemeSettingOptions;
  text: string;
  icon: string;
}[] = [
    { key: 'light', text: 'theme.lightTheme', icon: biSun },
    { key: 'dark', text: 'theme.darkTheme', icon: biMoon },
    { key: 'system', text: 'theme.systemTheme', icon: biLaptop },
    { key: 'realtime', text: 'theme.realtimeTheme', icon: biClock },
  ];

export function ThemeManager() {
  const themeCookie = useCookie<IThemeSettingOptions>(ThemeKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();

  // methods
  const getUserSetting = (): IThemeSettingOptions =>
    themeCookie.value || 'system';

  const getSystemTheme = (): ITheme => {
    try {
      return window
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : 'dark';
    } catch (error) {
      return 'light';
    }
  };
  const getRealtimeTheme = (): ITheme => {
    const now = new Date();
    const hour = now.getHours();
    const isNight = hour >= 17 || hour <= 5;
    return isNight ? 'dark' : 'light';
  };

  // state
  const currentTheme = computed(() =>
    availableThemes.find((t) => t.key == langugeAndThemeStore.themeSetting)
  );

  // wathcers
  const onThemeSettingChange = (themeSetting: IThemeSettingOptions) => {
    langugeAndThemeStore.setThemeSetting(themeSetting);
    if (themeSetting === 'realtime') {
      langugeAndThemeStore.setTheme(getRealtimeTheme());
    } else if (themeSetting === 'system') {
      langugeAndThemeStore.setTheme(getSystemTheme());
    } else {
      langugeAndThemeStore.setTheme(themeSetting);
    }

    setTheme();
  };
  const setTheme = () => {
    themeCookie.value = langugeAndThemeStore.themeSetting as IThemeSettingOptions;
  };

  watch(langugeAndThemeStore, (state) => {
    onThemeSettingChange(state.themeSetting as IThemeSettingOptions);
  });

  const onThemeSystemChange = () => {
    if (langugeAndThemeStore.themeSetting === 'system') {
      langugeAndThemeStore.setTheme(getSystemTheme());
    }
  };
  const onRealtimeCheck = () => {
    if (langugeAndThemeStore.themeSetting === 'realtime') {
      langugeAndThemeStore.setTheme(getRealtimeTheme());
    }
  };

  // init theme
  const initTheme = () => {
    langugeAndThemeStore.themeSetting = getUserSetting();
    onThemeSettingChange(
      langugeAndThemeStore.themeSetting as IThemeSettingOptions
    );
  };

  // lifecycle
  // let intervalCheckTime: NodeJS.Timer;
  let intervalCheckTime = ref();
  // onBeforeMount(() => initTheme());
  onMounted(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onThemeSystemChange);
    intervalCheckTime.value = setInterval(onRealtimeCheck, 1000);
  });
  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onThemeSystemChange);
    if (intervalCheckTime.value) clearInterval(intervalCheckTime.value);
  });

  return {
    initTheme,
    getUserSetting,
    getSystemTheme,
    getRealtimeTheme,
    currentTheme,
  };
}
