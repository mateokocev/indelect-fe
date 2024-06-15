import { defineStore } from "pinia";

export const usePiniaStorage = defineStore("piniaStorage", {
    state: () => ({ jwt: "", isAdmin: false }),
    getters: {
        getToken: (state) => state.token,
        getAdmin: (state) => state.isAdmin
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