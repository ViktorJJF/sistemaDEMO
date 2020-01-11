<template>
  <v-container fluid>
    <v-data-table
      hide-default-footer
      disable-pagination
      :headers="headers"
      :items="payments"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="month"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Resumen de pagos de: {{fullname}} ({{totalPayments}}/10 pagos)</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          v-show="item.paid"
          class="mr-3 mb-1 text-none"
          small
          color="success"
          @click="editItem(item)"
        >Editar</v-btn>
        <v-btn
          v-show="!item.paid"
          class="mr-3 mb-1 text-none"
          small
          color="error"
          @click="editItem(item)"
        >Agregar pago</v-btn>
      </template>
      <template v-slot:item.paid="{ item }">
        <v-checkbox color="primary" v-model="item.paid" :value="item.paid"></v-checkbox>
        <!-- <p v-if="item.paid" class="font-green">Pagó</p>
        <p v-else class="font-red">Falta pagar</p>-->
      </template>
      <template v-slot:expanded-item="{ item,headers }">
        <td :colspan="headers.length">
          <v-container fluid>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-text-field :value="200" dense hide-details outlined name="monto" label="monto"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  dense
                  hide-details
                  outlined
                  :items="['Soles','Dolares']"
                  value="Soles"
                  label="Moneda"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3">
                <v-btn small color="success" @click="savePayment(item)">Guardar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  props: {
    text: String,
    memberId: String,
    fullname: String
  },
  data() {
    return {
      payments2: [],
      expanded: [],
      singleExpand: false,
      dialog: false,
      headers: [
        {
          text: "Mes",
          align: "left",
          sortable: false,
          value: "month"
        },
        {
          text: "Estado",
          align: "left",
          sortable: false,
          value: "paid"
        },
        {
          text: "Acciones",
          align: "left",
          sortable: false,
          value: "action"
        },
        { text: "", value: "data-table-expand" }
      ],
      payments: [
        { id: 1, month: "Enero", paid: false, payment: null },
        { id: 2, month: "Febrero", paid: false, payment: null },
        { id: 3, month: "Marzo", paid: false, payment: null },
        { id: 4, month: "Abril", paid: false, payment: null },
        { id: 5, month: "Mayo", paid: false, payment: null },
        { id: 6, month: "Junio", paid: false, payment: null },
        { id: 7, month: "Julio", paid: false, payment: null },
        { id: 8, month: "Agosto", paid: false, payment: null },
        { id: 9, month: "Septiembre", paid: false, payment: null },
        { id: 10, month: "Octubre", paid: false, payment: null },
        { id: 11, month: "Noviembre", paid: false, payment: null },
        { id: 12, month: "Diciembre", paid: false, payment: null }
      ]
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    initialData() {
      this.payments2 = this.$store.getters["paymentsModule/paymentsByMember"](
        this.memberId
      );
      this.payments2.forEach(payment => {
        let paymentIndex = parseInt(payment.date.substring(0, 1)) - 1;
        this.payments[paymentIndex].payment = payment;
        this.payments[paymentIndex].paid = true;
        console.log(payment.date.substring(0, 1));
      });
    },
    editItem(item) {
      console.log("se editara el item: ", item.id);
      this.expanded.push(this.payments[item.id - 1]);
    },
    savePayment(item) {
      console.log("se guardara el item: ", item.id);
      let toSave = this.expanded.findIndex(row => row.id == item.id);
      this.expanded.splice(toSave, 1);
      console.log("guardar: ", this.payments[toSave]);
      this.payments[item.id - 1].paid = true;
      this.$store.commit(
        "successModule/showSuccess",
        "Pago guardado con éxito"
      );
    }
  },
  computed: {
    totalPayments() {
      return this.payments.reduce((prev, curr) => {
        if (curr.paid == true) return prev + 1;
        else return prev;
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.font-red {
  color: #c92a4b;
}
.font-green {
  color: #29ca7c;
}
</style>