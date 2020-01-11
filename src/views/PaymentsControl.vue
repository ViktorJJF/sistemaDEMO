<template>
  <v-container fluid>
    <v-row justify="center">
      <material-card
        width="1000px"
        icon="mdi-account-card-details"
        color="primary"
        title="Control de pagos"
        text="Resumen de control de pagos"
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
              <span class="font-weight-bold">Filtrar por nombre: {{ search }}</span>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    clearable
                    dense
                    hide-details
                    v-model="search"
                    append-icon="mdi-magnify"
                    placeholder="Escribe el nombre a buscar"
                    single-line
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:item.paymentState="{item}">
            <v-chip color="success" v-if="verifyPayment(item._id)">
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>Pagó
            </v-chip>
            <v-chip v-else color="error">
              <v-avatar left>
                <v-icon>mdi-close-circle</v-icon>
              </v-avatar>Falta pagar
            </v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <v-btn color="info" small dark @click="editItem(item)" class="text-none">Ver pagos</v-btn>
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
            {{ payments.length }}
          </span>
        </v-col>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </material-card>
    </v-row>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <record-component
          v-if="dialog"
          text="Ver informe"
          :memberId="editedItem._id"
          :fullname="editedItem.first_name+' '+editedItem.last_name"
        ></record-component>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dateFormat from "@/utils/customDate";
import Member from "@/classes/Member.js";
import { customCopyObject } from "@/utils/customCopyObject";
import { customHttpRequest } from "@/utils/customHttpRequest";
import MaterialCard from "@/components/global/MaterialCard";
import XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ImageUploader from "@/components/common/ImageUploader";
import RecordComponent from "@/components/PaymentsControl/Record";

export default {
  components: {
    MaterialCard,
    ImageUploader,
    RecordComponent
  },
  filters: {
    dateFormat: function(value) {
      return dateFormat(value);
    }
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
        text: "Estado de pagos",
        align: "left",
        sortable: true,
        value: "paymentState",
        width: 150
      },
      { text: "Acciones", value: "action", sortable: false }
    ],
    // payments: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo pago" : "Resumen de pagos";
    },
    payments() {
      return this.$store.state.paymentsModule.payments;
    },
    members() {
      return this.$store.state.membersModule.members;
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
      //members
      this.dataTableLoading = true;
      await this.$store.dispatch("membersModule/fetchMembers");
      this.dataTableLoading = false;
      //payments
      await this.$store.dispatch("paymentsModule/fetchPayments");
    },
    editItem(item) {
      this.editedIndex = this.payments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      const index = this.payments.indexOf(item);
      let paymentsId = this.payments[index]._id;
      const confirm = await this.$confirm(
        "¿Realmente deseas eliminar este registro?"
      );
      if (confirm) {
        this.$store.dispatch("paymentsModule/deleteMember");
        this.payments.splice(index, 1);
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
        this.$store.dispatch("paymentsModule/editMember", {
          id: this.payments[this.editedIndex]._id,
          data: this.editedItem
        });
        this.close();
      } else {
        //create member
        this.payments.push(this.editedItem);
        this.close();
      }
    },
    verifyPayment(id) {
      return this.$store.getters["paymentsModule/paymentsByMember"](id).length;
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
