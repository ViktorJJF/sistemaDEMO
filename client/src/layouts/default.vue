<template>
  <v-app id="keep">
    <toolbar />
    <drawer />
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script>
import Drawer from "@/components/core/Drawer";
import Toolbar from "@/components/core/Toolbar";
export default {
  components: {
    Drawer,
    Toolbar,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  props: {
    source: String,
  },
  created() {
    this.initialData();
  },
  methods: {
    async initialData() {
      await this.$store.dispatch("logiaModule/fetchLogia");
      this.logia = this.$deepCopy(this.$store.state.logiaModule.logia);
    },
  },
};
</script>

<style></style>
