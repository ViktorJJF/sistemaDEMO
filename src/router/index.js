import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [{
  path: "/",
  component: require("@/layouts/default.vue").default,
  meta: {
    requiresAuth: true
  },
  name: "dashboard",
  redirect: {
    name: "statistics"
  },
  children: [{
    path: "/estadisticas",
    name: "statistics",
    component: require("@/views/statistics").default
  }, {
    path: "/miembros",
    name: "members",
    component: require("@/views/Members").default
  }]
}];

const router = new Router({
  routes,
  mode: "history"
});

export default router;