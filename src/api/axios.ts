import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../utils/cookie';

let isTokenExpiredAlertShown = false;

//const userToken = useAuthStore(state => state.token);

const AXIOS_INSTANCE = axios.create({
  baseURL: ``,
  withCredentials: true,
});

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && token.length) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !isTokenExpiredAlertShown) {
      isTokenExpiredAlertShown = true;
      removeToken();
      alert('sessionExpired');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  },
);

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE(config).then(({ data }) => data);
};

export const getData = async <T>(url: string): Promise<T> => {
  const token = getToken();
  const res = await AXIOS_INSTANCE.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const multiFetcher = async (urlArr: string[]) => Promise.allSettled(urlArr.map((url) => getData(url)));
