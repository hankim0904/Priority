import baseAxios from 'axios';

export const axiosInstance = baseAxios.create({
  baseURL: '/api',
});
