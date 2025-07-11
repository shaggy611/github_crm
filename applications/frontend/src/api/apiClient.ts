import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

apiClient.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
        if (err.response?.status === 401) {
            window.location.href = '/auth';
        }
        return Promise.reject(err);
    }
);

export default apiClient;
