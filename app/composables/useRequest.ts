import type { UseFetchOptions } from "nuxt/app";

export const useRequest = (
  url: string,
  options: UseFetchOptions<unknown> = {}
) => {
  const config = useRuntimeConfig();
  const toast = useToast();

  return useFetch(url, {
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      const token = localStorage.getItem("token");
      options.headers = {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      };
    },
    onResponse({ response }) {
      const { status, _data } = response;
      if (status >= 200 && status < 300) {
        if (_data.code !== 200 && import.meta.client) {
          toast.error(_data.message || "请求出现问题");
        }
      }
    },
    onResponseError({ error, response }) {
      const message = error?.message || response?._data?.message || "请求错误";
      if (import.meta.client) {
        toast.error(message);
      }
    },
    ...options,
  });
};
