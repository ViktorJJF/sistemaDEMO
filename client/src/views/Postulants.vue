<template>
  <v-container fluid>
    <v-row justify="center">
      <material-card
        width="95%"
        icon="mdi-account-card-details"
        color="primary"
        title="Listado de miembros"
        text="Tabla resumen de miembros de la logia"
      >
        <v-select
          dark
          background-color="primary"
          placeholder="Selecciona rango"
          item-text="first_name"
          dense
          :items="$store.state.postulantsModule.postulants"
          item-value="_id"
          outlined
        ></v-select>
        <v-data-table
          :loading="dataTableLoading"
          loading-text="Cargando datos"
          no-results-text="No se encontraron resultados"
          :search="search"
          hide-default-footer
          :headers="headers"
          :items="postulants"
          sort-by="calories"
          @page-count="pageCount = $event"
          :page.sync="page"
          :items-per-page="itemsPerPage"
        >
          <template v-slot:top>
            <v-container>
              <span class="font-weight-bold">Filtrar por nombre: {{ search }}</span>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    clearable
                    dense
                    hide-details
                    v-model="search"
                    append-icon="mdi-magnify"
                    placeholder="Escribe el nombre del postulante a buscar"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog v-model="dialog" max-width="900px">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="info"
                        dark
                        class="mb-2 text-none"
                        v-on="on"
                        @click="editedItem.rank='Postulante'"
                      >Agregar Postulante</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-container class="pa-5">
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <v-card>
                              <v-container fluid>
                                <image-uploader :img="editedItem.profile_picture"></image-uploader>
                                <b class="center">
                                  {{ editedItem.first_name }}
                                  {{ editedItem.last_name }}
                                </b>
                                <v-select
                                  disabled
                                  dark
                                  background-color="primary"
                                  placeholder="Selecciona rango"
                                  item-text="name"
                                  dense
                                  v-model="editedItem.rank"
                                  :items="ranks"
                                  item-value="_id"
                                  outlined
                                ></v-select>
                              </v-container>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <v-card>
                              <v-container fluid>
                                <h3>Detalles del usuario</h3>
                                <v-row dense>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">Nombres</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.first_name"
                                      placeholder="Nombres"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">Apellidos</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.last_name"
                                      placeholder="Apellidos"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="12" md="12">
                                    <p class="body-1 font-weight-bold mb-0">Correo</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.email"
                                      placeholder="Correo"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">Teléfono</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.cell_number"
                                      placeholder="+33 680 807 5770"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">Celular</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.phone_number"
                                      placeholder="(800) 3537342"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">País</p>
                                    <v-select
                                      placeholder="Selecciona rango"
                                      item-text="name"
                                      dense
                                      v-model="editedItem.country"
                                      :items="countries"
                                      item-value="_id"
                                      outlined
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="6">
                                    <p class="body-1 font-weight-bold mb-0">Ciudad</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.city"
                                      placeholder="Selecciona una ciudad"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="12" md="12">
                                    <p class="body-1 font-weight-bold mb-0">Dirección</p>
                                    <v-text-field
                                      dense
                                      clearable
                                      class
                                      outlined
                                      v-model="editedItem.address"
                                      placeholder="059 2nd Hill"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card>
                          </v-col>
                        </v-row>
                        <postulant-info :id="editedItem._id" :key="componentKey"></postulant-info>
                      </v-container>
                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn outlined color="error" text @click="close">Cancelar</v-btn>
                        <v-btn :loading="loadingButton" color="success" @click="save">Guardar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn small color="info" class="mr-3" @click="exportPDF">Exportar a PDF</v-btn>
                <v-btn small color="info" @click="exportExcel">Exportar a Excel</v-btn>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              class="mr-3 mb-1 text-none"
              small
              color="success"
              @click="editItem(item);forceRerender();"
            >Editar</v-btn>
            <v-btn class="text-none" small color="error" @click="deleteItem(item)">Eliminar</v-btn>
          </template>
          <template v-slot:no-data>
            <v-alert type="error" :value="true">Aún no cuentas con marcas de productos</v-alert>
          </template>
          <template v-slot:item.createdAt="{ item }">{{ item.createdAt | dateFormat }}</template>
          <template v-slot:item.profile_picture="{ item }">
            <v-img
              :src="item.profile_picture"
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
            {{ postulants.length }}
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
import { customCopyObject } from "@/utils/customCopyObject";
import { customHttpRequest } from "@/utils/customHttpRequest";
import MaterialCard from "@/components/global/MaterialCard";
import XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImageUploader from "@/components/common/ImageUploader";
import PostulantInfo from "@/components/PostulantInfo";

export default {
  components: {
    PostulantInfo,
    MaterialCard,
    ImageUploader
  },
  filters: {
    dateFormat: function(value) {
      return dateFormat(value);
    }
  },
  data: () => ({
    componentKey: 0,
    dataTableLoading: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    loadingButton: false,
    validateError: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "DNI",
        align: "left",
        sortable: false,
        value: "dni",
        class: "customHeader"
      },
      {
        text: "Perfil",
        align: "left",
        sortable: false,
        value: "profile_picture",
        class: "customHeader"
      },
      {
        text: "Nombres",
        align: "left",
        sortable: true,
        value: "first_name",
        class: "colored",
        width: 150
      },
      {
        text: "Apellidos",
        align: "left",
        sortable: true,
        value: "last_name",
        width: 150
      },
      {
        text: "Correo",
        align: "left",
        sortable: false,
        value: "email",
        class: "customHeader"
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
    // postulants: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo miembro" : "Editar miembro";
    },
    ranks() {
      return this.$store.state.ranks;
    },
    countries() {
      return this.$store.state.countries;
    },
    postulants() {
      return this.$store.state.postulantsModule.postulants;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      this.dataTableLoading = true;
      await this.$store.dispatch("postulantsModule/fetchPostulants");
      this.dataTableLoading = false;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    exportExcel() {
      let data = XLSX.utils.json_to_sheet(this.postulants);
      const workbook = XLSX.utils.book_new();
      const filename = "miembros-logia";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    exportPDF() {
      // Default export is a4 paper, portrait, using milimeters for units
      var doc = new jsPDF({
        orientation: "landscape"
      });
      doc.text(
        "Listado de miembros de la logia: Francisco de Paula Gonzáles Vigil N° 38",
        15,
        10
      );
      doc.autoTable({
        theme: "grid",
        headStyles: { fillColor: [25, 53, 93] },
        styles: { fontSize: 9 },
        columnStyles: { europe: { halign: "center" } }, // European countries centered
        body: this.postulants,
        columns: [
          { header: "DNI", dataKey: "dni" },
          { header: "Nombres", dataKey: "first_name" },
          { header: "Apellidos", dataKey: "last_name" },
          { header: "Correo", dataKey: "email" },
          { header: "Celular", dataKey: "cell_number" },
          { header: "Teléfono", dataKey: "phone_number" },
          { header: "Dirección", dataKey: "address" },
          { header: "País", dataKey: "country" },
          { header: "Ciudad", dataKey: "city" },
          { header: "Rango", dataKey: "rank" }
        ]
      });
      doc.save("reporte_miembros_logia.pdf");
    },
    editItem(item) {
      this.editedIndex = this.postulants.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      const index = this.postulants.indexOf(item);
      let postulantsId = this.postulants[index]._id;
      const confirm = await this.$confirm(
        "¿Realmente deseas eliminar este registro?"
      );
      if (confirm) {
        this.$store.dispatch("postulantsModule/deletePostulant");
        this.postulants.splice(index, 1);
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
      if (this.editedIndex > -1) {
        //update postulant
        this.$store.dispatch("postulantsModule/editPostulant", {
          id: this.postulants[this.editedIndex]._id,
          data: this.editedItem
        });
        this.close();
      } else {
        //create postulant
        this.postulants.push(this.editedItem);
        this.close();
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
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>
