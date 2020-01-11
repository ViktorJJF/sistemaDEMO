<template>
  <v-container fluid>
    <v-row justify="center">
      <material-card
        width="800px"
        icon="mdi-account-card-details"
        color="primary"
        title="Personalización"
        text="Ajustes propios del panel de administración"
      >
        <v-row class="mx-5" v-if="logia">
          <v-col cols="12" sm="3">
            <p class="body-1 font-weight-bold mb-0">Nombre de la logia:</p>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field
              :rules="[v => !!v || 'Email is required']"
              dense
              outlined
              v-model="logia.name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <p class="body-1 font-weight-bold mb-0">Identificador:</p>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field hide-details dense outlined v-model="logia.number" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <p class="body-1 font-weight-bold mb-0">Color</p>
          </v-col>
          <v-col cols="12" sm="9">
            {{logia.color}}
            <v-color-picker v-model="logia.color" mode="hexa"></v-color-picker>
          </v-col>
          <v-col cols="12" sm="3">
            <p class="body-1 font-weight-bold mb-0">Imagen principal</p>
          </v-col>
          <v-col cols="12" sm="9">
            <image-uploader :img="logia.profile_picture"></image-uploader>
          </v-col>
        </v-row>
        <!-- slot actions -->
        <template v-slot:actions>
          <v-row justify="end" class="mr-1">
            <v-btn color="info" @click="updateLogia">Actualizar</v-btn>
          </v-row>
        </template>
      </material-card>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "@/components/global/MaterialCard";
import ImageUploader from "@/components/common/ImageUploader";
import customCopyObject from "@/utils/customCopyObject";
export default {
  components: {
    ImageUploader,
    MaterialCard
  },
  data() {
    return {
      logia: null
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      await this.$store.dispatch("logiaModule/fetchLogia");
      this.logia = this.$deepCopy(this.$store.state.logiaModule.logia);
    },
    updateLogia() {
      this.$store.commit("logiaModule/updateLogia", this.logia);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>