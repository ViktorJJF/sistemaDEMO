<template>
  <v-app id="keep">
    <toolbar />
    <drawer />
    <v-content v-if="isDataReady">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <v-overlay :value="overlay">
      <v-progress-circular :size="70" :width="3" color="primary" indeterminate></v-progress-circular>
      <p class="ml-n3">{{ overlayText }}</p>
    </v-overlay>
  </v-app>
</template>

<script>
import Drawer from "@/components/core/Drawer";
import Toolbar from "@/components/core/Toolbar";
export default {
  components: {
    Drawer,
    Toolbar
  },
  data() {
    return {};
  },
  props: {
    source: String
  },
  data: () => ({
    isDataReady: false
  }),
  computed: {
    overlay() {
      return this.$store.state.overlay.active;
    },
    overlayText() {
      return this.$store.state.overlay.text;
    }
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      this.isDataReady = true;
      this.$store.dispatch("showOverlay", false);
      this.$store.dispatch("showSnackbar", {
        text: "Bienvenido",
        color: "success"
      });
    }
  }
};
</script>

<style></style>
