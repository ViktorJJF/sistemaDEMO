import * as types from "@/store/mutation-types";
import router from "@/router";
import api from "@/services/api/auth";
import { buildSuccess, handleError } from "@/utils/utils.js";
import { addMinutes, format } from "date-fns";

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440;

const module = {
  namespaced: true,
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
    isTokenSet: (state) => state.isTokenSet,
  },

  actions: {
    login({ commit }, { email, password }) {
      return new Promise((resolve, reject) => {
        api
          .login(email, password)
          .then((res) => {
            let data = res.data.payload;
            console.log("login completo!");
            router.push({ name: "dashboard" });
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Bienvenido", commit, resolve);
            commit("login", data);
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .logout()
          .then((res) => {
            console.log("cerrando sesion");
            commit("logout");
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
  },

  mutations: {
    login(state, data) {
      state.user = data;
    },
    logout(state) {
      state.token = "";
      state.user = null;
      console.log("se borraran los datos");
    },
  },

  state: {
    user: null,
    token: JSON.parse(!!localStorage.getItem("token")) || null,
    isTokenSet: !!localStorage.getItem("token"),
  },
};

export default module;
