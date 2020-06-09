import axios from "axios";

window.axios = axios;
window.axios.defaults.baseURL = "https://logia-demo.herokuapp.com";
window.axios.defaults.withCredentials = true;
// window.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
window.axios.defaults.timeout = 10000;

// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
