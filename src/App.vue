<template>
  <v-app>
    <router-view></router-view>
    <snackbar />
  </v-app>
</template>

<script>
import snackbar from "@/components/global/snackbar";
export default {
  components: {
    snackbar
  }
};
</script>
