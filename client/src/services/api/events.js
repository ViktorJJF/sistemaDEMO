export default {
  listEvents(from, to) {
    return axios.get("/api/events", { from, to });
  },
  editEvent(id, payload) {
    return axios.put(`/api/events/${id}`, payload);
  },
  saveEvent(payload) {
    return axios.post("/api/events", payload);
  },
  deleteEvent(id) {
    return axios.delete(`/api/events/${id}`);
  },
};
