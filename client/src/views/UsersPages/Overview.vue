<template>
  <v-container fluid class="container-width">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6">
          <h2 class="table-title">Resumen de pagos</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    <span class="header">Meses</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Estado</span>
                  </th>
                  <th class="text-left">
                    <span class="header"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(month,idx) in months" :key="month">
                  <td>
                    <b>{{ month }}</b>
                  </td>
                  <td>
                    <v-icon color="success" v-if="payments[idx]">mdi-check-circle</v-icon>
                    <v-icon color="error" v-else>mdi-close-circle</v-icon>
                  </td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn text icon color="primary" v-on="on">
                          <v-icon color="info">mdi-file-multiple</v-icon>
                        </v-btn>
                      </template>
                      <span>Ver detalles</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12" sm="6">
          <h2 class="table-title">Resumen de asistencias</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    <span class="header">Fecha</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Estado</span>
                  </th>
                  <th class="text-left">
                    <span class="header"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(assistance,idy) in assistances" :key="idy">
                  <td>
                    <b>{{ assistance.date | formatDate }}</b>
                  </td>
                  <td>
                    <v-icon color="success" v-if="assistance.state">mdi-check-circle</v-icon>
                    <v-icon color="error" v-else>mdi-close-circle</v-icon>
                  </td>
                  <td>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn text icon color="primary" v-on="on">
                          <v-icon color="info">mdi-file-multiple</v-icon>
                        </v-btn>
                      </template>
                      <span>Ver detalles</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { format, compareAsc } from "date-fns";
export default {
  filters: {
    formatDate: function(value) {
      return format(value, "MM/dd/yyyy");
    }
  },
  data() {
    return {
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      payments: [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false
      ],
      assistances: [
        { date: new Date(2019, 1, 21), state: true },
        { date: new Date(2019, 1, 28), state: true },
        { date: new Date(2019, 2, 4), state: false },
        { date: new Date(2019, 2, 11), state: false },
        { date: new Date(2019, 2, 18), state: false },
        { date: new Date(2019, 2, 25), state: false }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container-width {
  border: 1px solid green;
  height: 100%;
  width: 700px;
  //   background-color: green;
}

.header {
  font-size: 1.5em;
}
.table-title {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #28156c;
  color: #ffffff;
  padding: 10px;
  margin-bottom: 5px;
}
</style>