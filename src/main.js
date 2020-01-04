import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import vuetify from "@/plugins/vuetify";
import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: "Aceptar",
  buttonFalseText: "Cancelar",
  color: "error",
  icon: "mdi-alert-circle-outline",
  title: "Advertencia",
  width: 350,
  property: "$confirm",
  buttonTrueColor: "red lighten3"
  // buttonFalseColor: "yellow lighten3"
});
//other plugins
import "@/plugins/veevalidate";
import "@/plugins/vue-chartist";
import "./bootstrap.js";
import "@/assets/scss/myStyles.scss";

import ImageUploader from "vue-image-upload-resize";
Vue.use(ImageUploader);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
