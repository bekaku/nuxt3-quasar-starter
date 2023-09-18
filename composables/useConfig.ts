export const useConfig = () => {
  const getConfig = (key: string) => {
    return useRuntimeConfig()[key] || undefined;
  };
  const isDevMode = () => {
    return process.env.NODE_ENV == 'development';
  };
  const getConfigPublic = (key: string) => {
    //useRuntimeConfig().public.cdnBaseUrl
    return useRuntimeConfig().public[key] || undefined;
  };
  const getConfigType = <T>(key: string): T => {
    //useRuntimeConfig().public.cdnBaseUrl
    return useRuntimeConfig().public[key] as unknown as T;
  };
  return {
    getConfig,
    getConfigPublic,
    isDevMode,
    getConfigType
  };
};
