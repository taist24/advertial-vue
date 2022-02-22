import axios from "axios";
import useAuthStore from "@/store/auth.store";
import { API_BASE_URL } from "@/includes/constants";

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = authStore.accessToken;
  return config;
});
