export default {
  login(email, password) {
    return axios.post("/api/login", { email, password });
  },
  logout(id) {
    return axios.get("/api/logout");
  },
};
