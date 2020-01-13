<template>
  <v-container fluid>
    <record text="Ver informe"></record>
  </v-container>
</template>

<script>
import { customCopyObject } from "@/utils/customCopyObject";
import Record from "@/components/PaymentsControl/Record";
export default {
  components: {
    Record
  },
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