export default {
  login(email, password) {
    return axios.post("/api/login", { email, password });
  },
  logout(id) {
    return axios.get("/api/logout");
  },
  editUser(id, payload) {
    return axios.put(`/api/members/${id}`, payload);
  },
  updatePassword(id, newPassword) {
    return axios.put(`/api/members/${id}/update-password`, { newPassword });
  },
};
