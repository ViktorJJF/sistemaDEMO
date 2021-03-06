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
        <v-data-table
          :loading="dataTableLoading"
          loading-text="Cargando datos"
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
                >Filtrar por nombre/dni: {{ search }}</span
              >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    clearable
                    dense
                    hide-details
                    v-model="search"
                    append-icon="mdi-magnify"
                    placeholder="Escribe el nombre o dni a buscar"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-dialog v-model="dialog" max-width="900px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="info" dark class="mb-2 text-none" v-on="on"
                        >Agregar Miembro</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <ValidationObserver ref="obs" v-slot="{ passes }">
                        <v-form>
                          <v-container class="pa-5">
                            <v-row dense>
                              <v-col cols="12" sm="4">
                                <v-container fluid>
                                  <image-uploader
                                    :img="editedItem.profile_picture"
                                  ></image-uploader>
                                  <b class="center">
                                    {{ editedItem.first_name }}
                                    {{ editedItem.last_name }}
                                  </b>
                                  <VSelectWithValidation
                                    :dark="true"
                                    backgroundColor="primary"
                                    rules="required"
                                    :items="ranks"
                                    v-model="editedItem.rank"
                                    label="Selecciona una rango"
                                    itemText="name"
                                    itemValue="_id"
                                  />
                                  <b class="center">
                                    Rol de usuario:
                                  </b>
                                  <VSelectWithValidation
                                    :dark="true"
                                    backgroundColor="primary"
                                    rules=""
                                    :items="roles"
                                    v-model="editedItem.role"
                                    label="Selecciona un rol"
                                  />
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
                                        v-model="editedItem.first_name"
                                        label="Nombres"
                                      />
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <p class="body-1 font-weight-bold mb-0">
                                        Apellidos
                                      </p>
                                      <VTextFieldWithValidation
                                        rules="required"
                                        v-model="editedItem.last_name"
                                        label="Apellidos"
                                      />
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <p class="body-1 font-weight-bold mb-0">
                                        Correo
                                      </p>
                                      <VTextFieldWithValidation
                                        rules="required|email"
                                        v-model="editedItem.email"
                                        label="Correo"
                                      />
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                      <p class="body-1 font-weight-bold mb-0">
                                        DNI
                                      </p>
                                      <VTextFieldWithValidation
                                        rules="required|decimal"
                                        v-model="editedItem.dni"
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
                                        v-model="editedItem.cell_number"
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
                                        v-model="editedItem.phone_number"
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
                                        v-model="editedItem.country"
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
                                        v-model="editedItem.city"
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
                                        v-model="editedItem.address"
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
                            <v-btn outlined color="error" text @click="close"
                              >Cancelar</v-btn
                            >
                            <v-btn
                              :loading="loadingButton"
                              color="success"
                              @click="passes(save)"
                              >Guardar</v-btn
                            >
                          </v-card-actions>
                        </v-form>
                      </ValidationObserver>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn small color="info" class="mr-3" @click="exportPDF"
                  >Exportar a PDF</v-btn
                >
                <!-- <v-btn small color="info" @click="exportExcel"
                  >Exportar a Excel</v-btn
                > -->
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn
              class="mr-3 mb-1 text-none"
              small
              color="success"
              @click="editItem(item)"
              >Editar</v-btn
            >
            <v-btn
              class="text-none"
              small
              color="error"
              @click="deleteItem(item)"
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
import MaterialCard from "@/components/global/MaterialCard";
import XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImageUploader from "@/components/common/ImageUploader";
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation";
import VSelectWithValidation from "@/components/inputs/VSelectWithValidation";

export default {
  components: {
    MaterialCard,
    ImageUploader,
    VTextFieldWithValidation,
    VSelectWithValidation,
  },
  filters: {
    dateFormat: function(value) {
      return dateFormat(value);
    },
  },
  data: () => ({
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
        class: "customHeader",
      },
      {
        text: "Nombres",
        align: "left",
        sortable: true,
        value: "first_name",
        class: "colored",
        width: 150,
      },
      {
        text: "Apellidos",
        align: "left",
        sortable: true,
        value: "last_name",
        width: 150,
      },
      {
        text: "Correo",
        align: "left",
        sortable: false,
        value: "email",
        class: "customHeader",
      },
      {
        text: "Celular",
        align: "left",
        sortable: false,
        value: "cell_number",
      },
      {
        text: "Dirección",
        align: "left",
        sortable: false,
        value: "address",
      },
      {
        text: "Ciudad",
        align: "left",
        sortable: false,
        value: "city",
      },
      {
        text: "Rango",
        align: "left",
        sortable: false,
        value: "rank",
      },
      { text: "Acciones", value: "action", sortable: false },
    ],
    // members: [],
    editedIndex: -1,
    editedItem: { role: "USER" },
    defaultItem: { role: "USER" },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo miembro" : "Editar miembro";
    },
    ranks() {
      return this.$store.state.ranks;
    },
    roles() {
      return this.$store.state.roles;
    },
    countries() {
      return this.$store.state.countries;
    },
    cities() {
      return this.$store.state.cities;
    },
    members() {
      return this.$store.state.membersModule.members;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    this.initialData();
  },
  methods: {
    async initialData() {
      this.dataTableLoading = true;
      await this.$store.dispatch("membersModule/fetchMembers");
      this.dataTableLoading = false;
    },
    exportExcel() {
      let data = XLSX.utils.json_to_sheet(this.members);
      const workbook = XLSX.utils.book_new();
      const filename = "miembros-logia";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    exportPDF() {
      // Default export is a4 paper, portrait, using milimeters for units
      var doc = new jsPDF({
        orientation: "landscape",
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
        body: this.members,
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
          { header: "Rango", dataKey: "rank" },
        ],
      });
      doc.save("reporte_miembros_logia.pdf");
    },
    editItem(item) {
      this.editedIndex = this.members.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      const index = this.members.indexOf(item);
      let memberId = this.members[index]._id;
      const confirm = await this.$confirm(
        "¿Realmente deseas eliminar este registro?"
      );
      if (confirm) {
        this.$store.dispatch("membersModule/deleteMember", memberId);
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
        //update member
        this.$store.dispatch("membersModule/editMember", {
          id: this.members[this.editedIndex]._id,
          data: this.editedItem,
        });
        this.close();
      } else {
        //create member
        this.$store.dispatch("membersModule/createMember", this.editedItem);
        this.close();
      }
    },
  },
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
