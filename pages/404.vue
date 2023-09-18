<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <app-result status="404" :description="t('error.pageNotFound')">
      <template #extra>
        <q-btn
          outline
          icon="mdi-arrow-left"
          :label="t('base.back') + t('base.home')"
          to="/"
        />
      </template>
    </app-result>
  </div>
</template>

<script lang="ts" setup>
import AppResult from '@/components/base/AppResult.vue';
import { useLang } from '@/composables/useLang';
const { t } = useLang();
definePageMeta({
  layout: 'empty',
  // or middleware: 'auth'
});
useHead({
  title: t('http.404'),
  meta: [{ name: 'description', content: 'My amazing site.' }],
});
</script>
