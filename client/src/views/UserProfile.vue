<template>
  <v-container fluid v-if="user">
    <v-row justify="center">
      <material-card
        width="800px"
        icon="mdi-account"
        color="primary"
        title="Perfil de Usuario"
        text="Ajustes propios del panel de administración"
      >
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <v-form>
            <v-container class="pa-5">
              <v-row dense>
                <v-col cols="12" sm="4">
                  <v-container fluid>
                    <image-uploader
                      :img="user.profile_picture"
                    ></image-uploader>
                    <b class="center">
                      {{ user.first_name }}
                      {{ user.last_name }}
                    </b>
                  </v-container>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-container fluid>
                    <h3>Detalles del usuario</h3>
                    <v-row dense>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          Nombres
                        </p>
                        <VTextFieldWithValidation
                          rules="required"
                          v-model="user.first_name"
                          label="Nombres"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          Apellidos
                        </p>
                        <VTextFieldWithValidation
                          rules="required"
                          v-model="user.last_name"
                          label="Apellidos"
                        />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <p class="body-1 font-weight-bold mb-0">
                          DNI
                        </p>
                        <VTextFieldWithValidation
                          rules="required|decimal"
                          v-model="user.dni"
                          label="DNI"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          Teléfono
                        </p>
                        <VTextFieldWithValidation
                          :rules="{
                            required: false,
                            decimal: true,
                          }"
                          v-model="user.cell_number"
                          label="+33 680 807 5770"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          Celular
                        </p>
                        <VTextFieldWithValidation
                          :rules="{
                            required: false,
                            decimal: true,
                          }"
                          v-model="user.phone_number"
                          label="+51982745576"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          País
                        </p>
                        <VSelectWithValidation
                          rules="required"
                          :items="countries"
                          v-model="user.country"
                          label="Selecciona país"
                          itemText="name"
                          itemValue="_id"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <p class="body-1 font-weight-bold mb-0">
                          Ciudad
                        </p>
                        <VSelectWithValidation
                          rules="required"
                          :items="cities"
                          v-model="user.city"
                          label="Selecciona una ciudad"
                          itemText="name"
                          itemValue="_id"
                        />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <p class="body-1 font-weight-bold mb-0">
                          Dirección
                        </p>
                        <VTextFieldWithValidation
                          :rules="{}"
                          v-model="user.address"
                          label="059 2nd Hill"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="success" @click="passes(updateUser)">Guardar</v-btn>
            </v-card-actions>
          </v-form>
        </ValidationObserver>
      </material-card>
    </v-row>
    <v-row justify="center">
      <material-card
        width="800px"
        icon="mdi-lock-check"
        color="primary"
        title="Actualizar Contraseña"
      >
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <v-form>
            <v-container>
              <v-row justify="space-between">
                <v-col cols="12" sm="8">
                  <VTextFieldWithValidation
                    rules="required"
                    v-model="newPassword"
                    label="Ingresa una nueva contraseña"
                    type="password"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn block color="success" @click="passes(updatePassword)"
                    >Guardar</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </material-card>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "@/components/global/MaterialCard";
import ImageUploader from "@/components/common/ImageUploader";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import VSelectWithValidation from "@/components/inputs/VSelectWithValidation";
import api from "@/services/api/auth";
export default {
  components: {
    MaterialCard,
    ImageUploader,
    VTextFieldWithValidation,
    VSelectWithValidation,
  },
  data() {
    return {
      newPassword: "",
      user: {},
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    initialData() {
      this.user = this.$deepCopy(this.$store.state.authModule.user);
    },
    updateUser() {
      this.$store.dispatch("authModule/editUser", {
        id: this.user._id,
        data: this.user,
      });
    },
    updatePassword() {
      this.$store.commit("loadingModule/showLoading");
      api
        .updatePassword(this.user._id, this.newPassword)
        .then((res) => {
          let msg = res.data.message;
          this.$store.commit("successModule/showSuccess", msg);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => this.$store.commit("loadingModule/showLoading", false));
    },
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    cities() {
      return this.$store.state.cities;
    },
  },
};
</script>

<style lang="scss" scoped></style>
