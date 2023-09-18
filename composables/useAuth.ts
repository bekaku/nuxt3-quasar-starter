import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthRefeshTokenKey,
  AppAuthTokenExpireKey,
} from '@/utils/constant';
import { UserDto, RefreshTokenResponse } from '@/types/models';
import { useAuthenStore } from '@/stores/authenStore';
import useBase from './useBase';
import { useLang } from './useLang';
import AuthenService from '@/api/AuthenService';
import { addDateByDays } from '@/utils/dateUtil';
import { ExpireCookieDays } from '@/utils/constant';
export default () => {
  const appAuthToken = useCookie(AppAuthTokenKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });
  const AppAuthRefeshToken = useCookie(AppAuthRefeshTokenKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });
  const AppAuthTokenExpire = useCookie(AppAuthTokenExpireKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });
  const AppAuthTokenCreated = useCookie(AppAuthTokenCreatedKey, {
    expires: addDateByDays(ExpireCookieDays),
    path: '/',
  });

  const authenStore = useAuthenStore();
  const { WeeConfirm, WeeLoader } = useBase();
  const { t } = useLang();
  const { singoutToServer } = AuthenService();

  const initAppAuthen = (): void => {
    // setAuthen(currentAuth());
  };

  const setAuthen = (auth: UserDto | null) => {
    if (auth != null) {
      authenStore.setAuthen(auth);
    }
  };

  const signOut = async () => {
    const conf = await WeeConfirm(t('app.monogram'), t('helper.logoutConfirm'));
    if (conf) {
      WeeLoader();
      await logoutToServer();
      WeeLoader(false);
      destroyAuthDataAndRedirect();
    }
    return;
  };
  const setAuthenticationCookies = (authResponse: RefreshTokenResponse) => {
    // setAuthCookies(cookies, authResponse);
    appAuthToken.value = authResponse.authenticationToken;
    AppAuthRefeshToken.value = authResponse.refreshToken;
    AppAuthTokenExpire.value = authResponse.expiresAt;
    AppAuthTokenCreated.value = Date.now().toString();

  };
  const logoutToServer = async () => {
    await singoutToServer({
      refreshToken: {
        refreshToken: AppAuthRefeshToken.value,
        email: authenStore.auth?.email,
      },
    });
  };

  const destroyAuthDataAndRedirect = (forceRedirectToLoginPage = true) => {
    // cookies.remove(AppAuthTokenKey);
    // cookies.remove(AppAuthRefeshTokenKey);
    // cookies.remove(AppAuthTokenExpireKey);
    // cookies.remove(AppAuthTokenCreatedKey);

    // LocalStorage.remove(AppAuthDataKey);

    appAuthToken.value = null;
    AppAuthRefeshToken.value = null;
    AppAuthTokenExpire.value = null;
    AppAuthTokenCreated.value = Date.now().toString();
    authenStore.logout();
    if (forceRedirectToLoginPage) {
      window.location.replace('/auth/login');
      // WeeGoTo('/auth/login', true);
    }
  };

  return {
    initAppAuthen,
    signOut,
    setAuthen,
    destroyAuthDataAndRedirect,
    setAuthenticationCookies,
    logoutToServer,
  };
};
