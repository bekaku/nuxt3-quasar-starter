<template>
  <q-layout view="hHh LpR fFf">
    <base-app-header />
    <!-- <app-drawer overlay /> -->
    <q-page-container class="app-feed-container q-my-lg">
      <div class="row">
        <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <lazy-feed-left class="fixed" />
        </div>
        <div class="col-12 col-md-6 app-feed-page">
          <router-view />
        </div>
        <div v-if="$q.screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <lazy-feed-right class="fixed" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// import AppDrawer from '@/components/base/AppDrawer.vue';
// import AppHeader from '@/components/base/AppHeader.vue';
// import FeedLeft from '@/components/feed/FeedLeft.vue';
// import FeedRight from '@/components/feed/FeedRight.vue';
</script>
