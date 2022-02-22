import { APP_NAME } from "@/includes/constants";
import axios from "axios";
import { defineStore } from "pinia";

export default defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
  }),
  actions: {
    logIn(data) {
      this.user = data;
      localStorage.setItem("user", JSON.stringify(data));
    },
    async logOut() {
      await axios.post("/logout");
      this.user = {};
      localStorage.removeItem("user");
    },
  },
  getters: {
    appName: () => APP_NAME,
    fullName: (state) => `${state.user.first_name} ${state.user.last_name}`,
    isLoggedIn: (state) => !!state.user.access_token,
    accessToken: (state) =>
      state.user.access_token ? `Bearer ${state.user.access_token}` : "",
  },
});
