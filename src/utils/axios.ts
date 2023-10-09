import axios from 'axios';
import store from '@/redux/store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3977/api',
});

export const localApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const state = store.getState();
  const token = state.session.user?.token;

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

// Para la API local
localApi.interceptors.request.use((c) => {
  const config = { ...c };
  const state = store.getState();
  const token = state.session.user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));
