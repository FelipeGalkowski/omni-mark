import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_MELI_API_URL,
})

// httpClient.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem(storageKeys.accessToken);
//   if (token) {
//     config.params = {
//       ...config.params,
//       token,
//     };
//   }
//   return config;
// });
