import { useState } from "react";

type ApiFunction<T> = () => Promise<{ data: T }>;

type CallbackFunction<T> = (data: any) => void;

type ErrorCallbackFunction = (e: any) => void;

type InvokeParams<T> = {
  api: ApiFunction<T>,
  callBack: CallbackFunction<T>,
  errorCallback?: ErrorCallbackFunction,
};

export const useLoader = <T>(initialState = false) => {
  const [loading, setLoading] = useState<boolean>(initialState);

  const on = () => setLoading(true);
  const off = () => setLoading(false);

  const invokeApi = async ({ api, callBack, errorCallback }: InvokeParams<T>) => {
    try {
      on();
      const { data } = await api();
      callBack(data);
    } catch (e) {
      errorCallback && errorCallback(e);
    } finally {
      off();
    }
  };

  return {
    loading,
    on,
    off,
    invokeApi,
  };
};
