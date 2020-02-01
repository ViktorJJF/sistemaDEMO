<template>
  <v-app id="keep">
    <toolbar />
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "@/components/core/Toolbar";
export default {
  components: {
    Toolbar
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      // this.dataTableLoading = true;

      await this.$store.dispatch("logiaModule/fetchLogia");
      this.$vuetify.theme.themes.light.primary = this.$store.state.logiaModule.logia.color;
      this.$store.commit("successModule/showSuccess", "Bienvenido");
      console.log("se monto app2");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>