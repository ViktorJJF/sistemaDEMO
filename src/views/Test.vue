<template>
  <v-container fluid>
    <div v-for="(local,index) in localData" :key="local.id">
      <v-text-field outlined dense name="name" v-model="local.description"></v-text-field>
      <v-btn color="success" @click="save(local.id,local)">Guardar</v-btn>
    </div>
    <div>LocalData: {{localData}}</div>
    <div>Store: {{$store.state.testModule.messages}}</div>
  </v-container>
</template>

<script>
import { customCopyObject } from "@/utils/customCopyObject";
export default {
  data() {
    return {
      localData: []
    };
  },
  mounted() {
    this.localData = customCopyObject(this.$store.state.testModule.messages);
  },
  methods: {
    save(id, object) {
      console.log("se guardara el id: ", id);
      let msg = "gaea prr4";
      this.$store.dispatch("testModule/editMessage", {
        id,
        object
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>