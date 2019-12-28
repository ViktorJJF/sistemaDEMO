<template>
  <v-container fluid>
    <v-row justify="center">
      <material-card
        width="100%"
        icon="mdi-cellphone-dock"
        color="primary"
        title="Marca de producto"
        text="Tabla resumen de marcas de productos"
      >
        <v-data-table
          no-results-text="No se encontraron resultados"
          :search="search"
          hide-default-footer
          :headers="headers"
          :items="members"
          sort-by="calories"
          @page-count="pageCount = $event"
          :page.sync="page"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:top>
            <v-container>
              <span class="font-weight-bold"
                >Filtrar por nombre: {{ search }}</span
              >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    dense
                    hide-details
                    v-model="search"
                    append-icon="mdi-magnify"
                    placeholder="Escribe el nombre de la marca"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="info" dark class="mb-2" v-on="on"
                        >Agregar Marca</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-container class="pa-5">
                        <v-alert text type="error" :value="validateError"
                          >Es necesario colocar el nombre de la marca</v-alert
                        >
                        <v-row dense>
                          <v-col cols="12" sm="12" md="12">
                            <p class="body-1 font-weight-bold">Nombre</p>
                            <v-text-field
                              clearable
                              class
                              outlined
                              v-model="editedItem.name"
                              placeholder="Nombre de la marca"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <span class="font-weight-bold">Descripción</span>
                            <v-textarea
                              hide-details
                              placeholder="Ingresa una descripción"
                              outlined
                              v-model="editedItem.description"
                            ></v-textarea>
                          </v-col>
                          <!-- <v-col cols="12" sm="12" md="12">
                          <span class="font-weight-bold">Estado</span>
                          <v-select
                            hide-details
                            v-model="editedItem.status"
                            :items="[{name:'Activo',value:true},{name:'Inactivo',value:false}]"
                            item-text="name"
                            item-value="value"
                            outlined
                          ></v-select>
                          </v-col>-->
                        </v-row>
                      </v-container>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn outlined color="error" text @click="close"
                          >Cancelar</v-btn
                        >
                        <v-btn
                          :loading="loadingButton"
                          color="success"
                          @click="save"
                          >Guardar</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn class="mr-3" small color="success" @click="editItem(item)"
              >Editar</v-btn
            >
            <v-btn small color="error" @click="deleteItem(item)"
              >Eliminar</v-btn
            >
          </template>
          <template v-slot:no-data>
            <v-alert type="error" :value="true"
              >Aún no cuentas con marcas de productos</v-alert
            >
          </template>
          <template v-slot:item.createdAt="{ item }">{{
            item.createdAt | dateFormat
          }}</template>
          <template v-slot:item.profile_picture="{ item }">
            <v-img
              :src="item.profile_picture"
              lazy-src="/images/image-placeholder.png"
              class="border-image"
              contain
              max-width="200"
              max-height="150"
            ></v-img>
          </template>
        </v-data-table>
        <v-col cols="12" sm="12">
          <span>
            <strong>Total de miembros:</strong>
            {{ members.length }}
          </span>
        </v-col>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </material-card>
    </v-row>
  </v-container>
</template>

<script>
import dateFormat from "@/utils/customDate";
import Member from "@/classes/Member.js";
import { customCopyObject } from "@/utils/customCopyObject";
import { customHttpRequest } from "@/utils/customHttpRequest";
import MaterialCard from "@/components/global/MaterialCard";
export default {
  components: {
    MaterialCard
  },
  filters: {
    dateFormat: function(value) {
      return dateFormat(value);
    }
  },
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    loadingButton: false,
    validateError: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "left",
        sortable: false,
        value: "id"
      },
      {
        text: "Perfil",
        align: "left",
        sortable: false,
        value: "profile_picture"
      },
      {
        text: "Nombres",
        align: "left",
        sortable: false,
        value: "first_name"
      },
      {
        text: "Apellidos",
        align: "left",
        sortable: false,
        value: "last_name"
      },
      {
        text: "Correo",
        align: "left",
        sortable: false,
        value: "email"
      },
      {
        text: "Celular",
        align: "left",
        sortable: false,
        value: "cell_number"
      },
      {
        text: "Dirección",
        align: "left",
        sortable: false,
        value: "address"
      },
      {
        text: "País",
        align: "left",
        sortable: false,
        value: "country"
      },
      {
        text: "Ciudad",
        align: "left",
        sortable: false,
        value: "city"
      },
      {
        text: "Rango",
        align: "left",
        sortable: false,
        value: "rank"
      },
      { text: "Acciones", value: "action", sortable: false }
    ],
    members: [],
    editedIndex: -1,
    editedItem: Member,
    defaultItem: customCopyObject(Member)
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva marca" : "Editar marca";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.members = await this.$store.dispatch("membersModule/fetchMembers");
    },
    validateForm() {
      if (!this.editedItem.name) {
        this.validateError = true;
        return false;
      }
      this.validateError = false;
      return true;
    },
    editItem(item) {
      this.editedIndex = this.members.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.members.indexOf(item);
      let membersId = this.members[index]._id;
      if (confirm("¿Seguro que deseas eliminar este elemento?")) {
        customHttpRequest("delete", "/api/members/delete/" + membersId);
        this.members.splice(index, 1);
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (!this.validateForm()) return false;
      if (this.editedIndex > -1) {
        let brandId = this.members[this.editedIndex]._id;
        //update brand
        this.loadingButton = true;
        customHttpRequest(
          "put",
          "/api/members/update/" + brandId,
          this.editedItem,
          (err, callback) => {
            if (err) {
              return (this.loadingButton = false);
            }
            Object.assign(this.members[this.editedIndex], this.editedItem);
            this.loadingButton = false;
            this.close();
          }
        );
      } else {
        //create brand
        this.loadingButton = true;
        customHttpRequest(
          "post",
          "/api/members/create",
          this.editedItem,
          (err, callback) => {
            if (err) {
              return (this.loadingButton = false);
            }
            this.members.push(callback);
            this.loadingButton = false;
            this.close();
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.border-image {
  border-style: solid;
  border-width: 1px;
}
</style>
