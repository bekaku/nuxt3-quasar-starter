import { RequestType } from '@/types/common';
import { useConfig } from './useConfig';
export const useAxios = () => {
  const { $appAxios } = useNuxtApp();
  const { locale } = useLang();
  const { isDevMode } = useConfig();
  const callAxios = <T>(req: RequestType): Promise<T> => {
    return new Promise((resolve, reject) => {
      // api.defaults.headers = reqHeader();
      // api.defaults.headers['Accept-Language'] = locale.value;
      // api.defaults.headers.Authorization = `Bearer ${token}`;
      // $appAxios.defaults.headers.common['Content-Type'] = 'application/json';
      $appAxios.defaults.headers['Accept-Language'] = locale.value as string;
      // $appAxios.defaults.headers.Authorization = `Bearer ${authTokenKey.value}`;

      if (req.baseURL) {
        $appAxios.defaults.baseURL = req.baseURL;
      } else {
        $appAxios.defaults.baseURL = useRuntimeConfig().public.apiBaseUrl;
      }

      if (req.contentType) {
        $appAxios.defaults.headers['Content-Type'] = req.contentType;
      } else {
        $appAxios.defaults.headers['Content-Type'] = 'application/json';
      }
      // console.log('useCallApi > useFetch :', req);
      if (isDevMode()) {
        console.log(`api ${$appAxios.defaults.baseURL}${req.API}`);
      }
      // $appAxios({
      //   method: req.method,
      //   url: req.API,
      //   data: req.body ? req.body : undefined
      // })
      $appAxios({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined
      })
        .then((response: any) => {
          resolve(response.data);
        })
        .catch((error: any) => {
          console.error('useCallApi > catch', error);
          reject(error);
        });
    });
  };
  return { callAxios };
};
