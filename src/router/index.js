import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [
  {
    path: "/login",
    component: require("@/views/authPages/Login.vue").default,
    name: "login"
  },
  {
    path: "/",
    component: require("@/layouts/default.vue").default,
    meta: {
      requiresAuth: true
    },
    name: "dashboard",
    redirect: {
      name: "statistics"
    },
    children: [
      {
        path: "/estadisticas",
        name: "statistics",
        component: require("@/views/Statistics").default
      },
      {
        path: "/miembros",
        name: "members",
        component: require("@/views/Members").default
      },
      {
        path: "/postulantes",
        name: "postulants",
        component: require("@/views/Postulants").default
      },
      {
        path: "/control-de-pagos",
        name: "paymentsControl",
        component: require("@/views/PaymentsControl").default
      },
      {
        path: "/control-de-asistencias",
        name: "assistancesControl",
        component: require("@/views/AssistancesControl").default
      },
      {
        path: "/perfil-de-logia",
        name: "logiaProfile",
        component: require("@/views/LogiaProfile").default
      },
      {
        path: "/personalizacion",
        name: "personalization",
        component: require("@/views/Personalization").default
      },
      {
        path: "/suscripcion",
        name: "suscription",
        component: require("@/views/Suscription").default
      },
      {
        path: "/test",
        name: "test",
        component: require("@/views/Test").default
      }
    ]
  }
];

const router = new Router({
  routes,
  mode: "history"
});

export default router;
