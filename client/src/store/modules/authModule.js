import * as types from "@/store/mutation-types";
import router from "@/router";
import api from "@/services/api/auth";
import apiMembers from "@/services/api/members";
import { buildSuccess, handleError } from "@/utils/utils.js";
import { addMinutes, format } from "date-fns";

const module = {
  namespaced: true,
  getters: {
    user: (state) => state.user,
    token: (state) => state.token,
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
    editUser({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        commit("loadingModule/showLoading", true, { root: true });
        apiMembers
          .editMember(id, data)
          .then((res) => {
            let data = res.data.payload;
            buildSuccess("Registro guardado con éxito", commit, resolve);
            commit("editUser", data);
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
      state.user = null;
      console.log("se borraran los datos");
    },
    editUser(state, data) {
      state.user = data;
    },
  },

  state: {
    user: null,
  },
};

export default module;
