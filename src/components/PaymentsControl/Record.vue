<template>
  <v-container fluid>
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on }">
        <v-btn class="text-none" small color="info" dark v-on="on">{{text}}</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline lighten-2" primary-title>Historial de pagos</v-card-title>
        <v-divider></v-divider>
        <v-container fluid class="mx-4">
          <span class="body-1 font-weight-bold mb-0">Nombres:</span>
          <span>Victor juan</span>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="payment in payments"
                    :key="payment.id"
                    class="text-left"
                  >{{payment.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="payment in payments" :key="payment.name">
                    <v-checkbox color="info" v-model="payment.paid" :value="payment.paid"></v-checkbox>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" text @click="dialog = false">{{Text}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {
      dialog: false,
      payments: [
        { id: 1, name: "Enero", paid: false },
        { id: 2, name: "Febrero", paid: true },
        { id: 3, name: "Marzo", paid: true },
        { id: 4, name: "Abril", paid: true },
        { id: 5, name: "Mayo", paid: true },
        { id: 6, name: "Junio", paid: true },
        { id: 7, name: "Julio", paid: false },
        { id: 8, name: "Agosto", paid: true },
        { id: 9, name: "Septiembre", paid: false },
        { id: 10, name: "Octubre", paid: true },
        { id: 11, name: "Noviembre", paid: false },
        { id: 12, name: "Diciembre", paid: true }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>