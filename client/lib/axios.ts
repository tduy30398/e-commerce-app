import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
);

export default axiosInstance;