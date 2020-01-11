<template>
  <custom-card title="Estadísticas" icon="mdi-chart-bar">
    <template v-slot:content>
      <v-row justify="center">
        <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            color="green"
            icon="mdi-account"
            title="Miembros"
            :value="getTotalMembers"
            small-value="Miembros"
          />
        </v-col>

        <!-- <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            color="orange"
            icon="mdi-content-copy"
            title="Productos"
            :value="5"
            small-value="Unidades"
          />
        </v-col>-->

        <!-- <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            color="red"
            icon="mdi-cellphone-dock"
            title="Marcas"
            :value="5"
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            small-value="marcas"
          />
        </v-col>-->

        <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            color="indigo"
            icon="mdi-format-list-bulleted"
            title="Postulantes"
            :value="6"
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            small-value="postulantes"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            color="purple"
            icon="mdi-chart-line"
            title="Pagos"
            :value="7"
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            small-value="pendientes"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <material-stats-card
            color="pink"
            icon="mdi-store"
            title="Asistencias"
            :value="24"
            sub-icon="mdi-update"
            sub-text="Justo Ahora"
            small-value="inasistencias"
          />
        </v-col>
      </v-row>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="4">
            <material-chart-card
              :data="dailySalesChart.data"
              :options="dailySalesChart.options"
              color="info"
              type="Line"
            >
              <h4 class="title font-weight-light">Miembros mensuales</h4>

              <p class="category d-inline-flex font-weight-light">
                <v-icon color="green" small>mdi-arrow-up</v-icon>
                <span class="green--text">0%</span>&nbsp; incremento de miembros
                este mes
              </p>

              <template v-slot:actions>
                <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                <span class="caption grey--text font-weight-light">actualizado justo ahora</span>
              </template>
            </material-chart-card>
          </v-col>
          <v-col cols="12" lg="4">
            <material-chart-card
              :data="emailsSubscriptionChart.data"
              :options="emailsSubscriptionChart.options"
              color="red"
              type="Line"
            >
              <h4 class="title font-weight-light">Asistencias mensuales</h4>
              <p class="category d-inline-flex font-weight-light">
                <v-icon color="green" small>mdi-arrow-up</v-icon>
                <span class="green--text">0%</span>&nbsp; incremento de asistencias
                este mes
              </p>
              <template v-slot:actions>
                <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                <span class="caption grey--text font-weight-light">actualizado justo ahora</span>
              </template>
            </material-chart-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </custom-card>
</template>

<script>
import dashboardCard from "@/components/Statistics/dashboardCard";
import CustomCard from "@/components/Statistics/CustomCard";
import MaterialStatsCard from "@/components/Statistics/StatsCard";
import MaterialChartCard from "@/components/Statistics/ChardCard";
import apexChart from "vue-apexcharts";
export default {
  components: {
    CustomCard,
    dashboardCard,
    apexChart,
    MaterialStatsCard,
    MaterialChartCard
  },
  data() {
    return {
      emailsSubscriptionChart: {
        data: {
          labels: [
            "En",
            "Fe",
            "Ma",
            "Ab"
            // "May",
            // "Jun",
            // "Jul",
            // "Ag",
            // "Se",
            // "Oc",
            // "No",
            // "Di"
          ],
          series: [[27, 28, 29, 30]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dailySalesChart: {
        data: {
          labels: [
            "En",
            "Fe",
            "Ma",
            "Ab"
            // "May",
            // "Jun",
            // "Jul",
            // "Ag",
            // "Se",
            // "Oc",
            // "No",
            // "Di"
          ],
          series: [[25, 27, 27, 30]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      isDataReady: false,
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
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [
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
          ]
        }
      },
      series: [
        {
          name: "Cantidad",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  },
  async mounted() {
    await this.$store.dispatch("membersModule/fetchMembers");
  },
  methods: {
    async getInitialData() {}
  },
  computed: {
    getTotalMembers() {
      return this.$store.getters["membersModule/getTotalMembers"];
    }
  }
};
</script>
<style>
.underline {
  text-decoration: underline;
}
</style>
