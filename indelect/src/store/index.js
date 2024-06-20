import { defineStore } from "pinia";

export const usePiniaStorage = defineStore("piniaStorage", {
    state: () => ({ jwt: localStorage.getItem("token"), isAdmin: localStorage.getItem("isAdmin") }),
    getters: {
        getToken: (state) => { return state.token; },
        getAdmin: (state) => { return state.isAdmin; }
    },
    actions: {
        setAuthData(token, isAdmin) {
          this.jwt = token;
          this.isAdmin = isAdmin;
        },
        clearAuthData() {
            this.jwt = '';
            this.isAdmin = false;
        },
    },
  },
);