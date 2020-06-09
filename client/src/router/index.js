import Vue from "vue";
import Router from "vue-router";
import { store } from "@/store";
import { isLogged } from "@/utils/utils.js";

Vue.use(Router);

let routes = [
  {
    path: "/login",
    component: require("@/views/authPages/Login.vue").default,
    name: "login",
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/",
    component: require("@/layouts/default.vue").default,
    meta: {
      requiresAuth: true,
    },
    name: "dashboard",
    redirect: {
      name: "assistancesControl",
    },
    children: [
      {
        path: "/estadisticas",
        name: "statistics",
        component: require("@/views/Statistics").default,
      },
      {
        path: "/miembros",
        name: "members",
        component: require("@/views/Members").default,
      },
      {
        path: "/postulantes",
        name: "postulants",
        component: require("@/views/Postulants").default,
      },
      {
        path: "/control-de-pagos",
        name: "paymentsControl",
        component: require("@/views/PaymentsControl").default,
      },
      {
        path: "/control-de-asistencias",
        name: "assistancesControl",
        component: require("@/views/AssistancesControl").default,
      },
      {
        path: "/perfil-de-logia",
        name: "logiaProfile",
        component: require("@/views/LogiaProfile").default,
      },
      {
        path: "/personalizacion",
        name: "personalization",
        component: require("@/views/Personalization").default,
      },
      {
        path: "/suscripcion",
        name: "suscription",
        component: require("@/views/Suscription").default,
      },
      {
        path: "/perfil-usuario",
        name: "userProfile",
        component: require("@/views/UserProfile").default,
      },
      {
        path: "/test",
        name: "test",
        component: require("@/views/Test").default,
      },
    ],
  },
  {
    path: "/resumen",
    component: require("@/layouts/UserLayout.vue").default,
    meta: {
      requiresAuth: true,
    },
    name: "userDashboard",
    redirect: {
      name: "overview",
    },
    children: [
      {
        path: "/resumen",
        name: "overview",
        component: require("@/views/UsersPages/Overview").default,
      },
    ],
  },
];

const router = new Router({
  routes,
  // mode: "history",
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.authModule.user) {
    let loginStatus = await isLogged();
    console.log("este es el valor de logger: ", loginStatus);
    if (loginStatus) {
      console.log("esta logeado");
      store.state.authModule.user = loginStatus;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.authModule.user) {
      next({
        name: "login",
        params: {
          nextUrl: to.fullPath,
        },
      });
    } else {
      let user = store.state.authModule.user;
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (
          user.role == "USER" ||
          user.role == "ADMIN" ||
          user.role == "SUPERADMIN"
        ) {
          next();
        } else {
          next({
            name: "dashboard",
          });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.state.authModule.user == null) {
      next();
    } else {
      next({
        name: "dashboard",
      });
    }
  } else {
    next();
  }
});

export default router;
