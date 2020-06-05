export default {
  fetchMembers() {
    return axios.get("/api/members");
  },
  editMember(id, payload) {
    return axios.put(`/api/members/${id}`, payload);
  },
  saveMember(payload) {
    return axios.post("/api/members", payload);
  },
  deleteMember(id) {
    return axios.delete(`/api/members/${id}`);
  },
};
