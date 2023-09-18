<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { watch } from 'vue';
import { AppSetup } from './utils/app';
import { useLangugeAndThemeStore } from '@/stores/langugeAndThemeStore';
import { ITheme } from '@/types/common';
import useInitAuth from '@/composables/useInitAuth';
// import { useAuthenStore } from '@/stores/authenStore';
const { init } = useInitAuth();
const { data: userData } = await useAsyncData('initUserData', () => init());
console.log('initUserData', userData.value);

const $q = useQuasar();
const langugeAndThemeStore = useLangugeAndThemeStore();
AppSetup();
const setDark = (theme: ITheme) => {
  if (theme == 'dark') {
    $q.dark.set(true);
  } else {
    $q.dark.set(false);
  }
};
setDark(langugeAndThemeStore.theme as ITheme);
watch(langugeAndThemeStore, (state) => {
  setDark(state.theme as ITheme);
});
</script>
