import * as types from "@/store/mutation-types";
import api from "@/services/api/members.js";
import { buildSuccess, handleError } from "@/utils/utils.js";

const module = {
  namespaced: true,
  state: {
    members: [],
    totalMembers: 0,
  },
  actions: {
    fetchMembers({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.members.length > 0) resolve();
        else {
          api
            .fetchMembers()
            .then((response) => {
              // commit(types.TOTAL_USERS, response.data.totalDocs)
              commit("fetchMembers", response.data.payload);
              resolve();
            })
            .catch((error) => {
              console.log("se produjo un error");
              handleError(error, commit, reject);
            });
        }
      });
    },
    createMember({ commit }, data) {
      return new Promise((resolve, reject) => {
        api
          .saveMember(data)
          .then((res) => {
            let data = res.data.payload;
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro guardado con éxito", commit, resolve);
            commit("createMember", data);
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    editMember({ commit }, { id, data }) {
      return new Promise((resolve, reject) => {
        api
          .editMember(id, data)
          .then((res) => {
            let data = res.data.payload;
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro guardado con éxito", commit, resolve);
            commit("editMember", {
              id,
              data,
            });
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    deleteMember({ commit }, id) {
      return new Promise((resolve, reject) => {
        api
          .deleteMember(id)
          .then((res) => {
            let data = res.data.payload;
            commit("loadingModule/showLoading", true, { root: true });
            buildSuccess("Registro eliminado con éxito", commit, resolve);
            commit("deleteMember", id);
            resolve();
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
  },
  mutations: {
    fetchMembers(state, members) {
      members.forEach((member) => {
        member["paymentState"] = Math.random() >= 0.5;
      });
      state.members = members;
    },
    createMember(state, data) {
      state.members.push(data);
    },
    editMember(state, { id, data }) {
      let indexToUpdate = state.members.findIndex((member) => member._id == id);
      state.members.splice(indexToUpdate, 1, {
        ...data,
      });
    },
    deleteMember(state, id) {
      let indexToDelete = state.members.findIndex((member) => member._id == id);
      state.members.splice(indexToDelete, 1);
    },
    [types.TOTAL_MEMBERS](state, value) {
      state.totalMembers = value;
    },
  },
  getters: {
    getTotalMembers: (state) => {
      return state.members.length;
    },
    getMemberByDNI: (state) => (dni) => {
      let member = state.members.find((member) => member.dni == dni);
      if (member) {
        return member;
      }
      return {};
    },
  },
};

export default module;
