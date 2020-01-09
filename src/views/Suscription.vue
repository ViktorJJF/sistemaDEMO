<template>
  <v-container fluid>
    <v-row justify="center">
      <material-card
        width="800px"
        icon="mdi-account-card-details"
        color="primary"
        title="Suscripción"
        text="Servicio vigente"
      >
        <v-row align="center" justify="center">
          <v-icon size="60">mdi-credit-card</v-icon>
          <h2>Estándar</h2>
        </v-row>
        <p class="body-1 text-center">
          Finaliza el
          <b>{{new Date(2021,2,15,10,0,0) | formatDate}}</b>
        </p>
      </material-card>
    </v-row>
  </v-container>
</template>

<script>
import MaterialCard from "@/components/global/MaterialCard";
import formatRFC7231 from "date-fns/formatRFC7231";
import format from "date-fns/format";
import { es } from "date-fns/locale";
export default {
  components: {
    MaterialCard
  },
  data() {
    return {};
  },
  filters: {
    formatDate: value => {
      return format(value, "do 'de' MMMM yyyy ", { locale: es });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>