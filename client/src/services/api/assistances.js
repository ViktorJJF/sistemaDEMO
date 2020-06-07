export default {
  listAssistances(memberId) {
    return axios.get("/api/assistances", { params: { memberId } });
  },
  editAssistance(id, payload) {
    return axios.put(`/api/assistances/${id}`, payload);
  },
  saveAssistance(payload) {
    return axios.post("/api/assistances", payload);
  },
  deleteAssistance(id) {
    return axios.delete(`/api/assistances/${id}`);
  },
};
