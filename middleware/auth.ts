import { AppAuthTokenKey } from '@/utils/constant';

export default defineNuxtRouteMiddleware(async (to) => {
  const appAuthToken = useCookie(AppAuthTokenKey);
  // skip middleware on server
  console.log('middleware > auth.ts', appAuthToken.value);
  // const authTokenKey = localStorage.getItem(AppAuthTokenKey);
  if (!appAuthToken.value) {
    return navigateTo({ path: '/auth/login/' }, { replace: true });
  }
});
