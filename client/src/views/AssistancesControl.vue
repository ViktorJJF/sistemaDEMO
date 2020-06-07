<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card color="primary" width="500px" class="mr-5">
        <v-overlay
          :absolute="true"
          :value="!activeEvent || assistanceState ? true : false"
        >
          <v-alert type="error" :value="!activeEvent">
            No hay eventos disponibles
          </v-alert>
          <v-alert
            type="error"
            :value="
              (assistanceState ? true : false) && (activeEvent ? true : false)
            "
          >
            Ya marcaste tu asistencia
          </v-alert>
        </v-overlay>
        <v-container fluid>
          <v-row justify="center">
            <v-icon size="250" color="white">mdi-clock-fast</v-icon>
          </v-row>
          <v-row justify="center">
            <vue-clock></vue-clock>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="7" class="text-center">
              <b class="white--text">DNI: {{ user.dni }}</b>
              <br />
              <b v-if="activeEvent" class="white--text"
                >Evento activo: Reunión
                {{ activeEvent.datetime | formatDate }}</b
              >
              <!-- <v-text-field
                    disabled
                    clearable
                    background-color="white"
                    outlined
                    placeholder="DNI"
                    hide-details
                    type="number"
                    v-model="user.dni"
              ></v-text-field>-->
              <!-- <v-btn x-small color="white" @click="randomDNI">random</v-btn> -->
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn color="info" x-large @click="checkAssistance" width="252"
              >Marcar Asistencia</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
      <v-card>
        <v-container>
          <h2 class="table-title">Resumen de asistencias</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    <span class="header">Evento</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Hora</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Estado</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(assistance, idy) in assistances" :key="idy">
                  <td>
                    <b
                      >{{ assistance.eventId ? assistance.eventId.title : "" }}
                    </b>
                  </td>
                  <td>{{ assistance.createdAt | formatHour }}</td>
                  <td class="text-center">
                    <span
                      :class="{
                        asistencia: assistance.state === 'A' ? true : false,
                        tardanza: assistance.state === 'T' ? true : false,
                        falta: assistance.state === 'F' ? true : false,
                      }"
                      >{{ assistance.state }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-row>
    <v-row justify="center" class="mt-3">
      <v-card>
        <v-container>
          <h2 class="table-title">Listado de eventos</h2>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    <span class="header">Nombre</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Fecha</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Hora</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Duración</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Tolerancia</span>
                  </th>
                  <th class="text-left">
                    <span class="header">Estado</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(event, idy) in events" :key="idy">
                  <td>
                    <b>{{ event.title }}</b>
                  </td>
                  <td>
                    {{ event.datetime | formatDate }}
                  </td>
                  <td>
                    {{ event.datetime | formatHour }}
                  </td>
                  <td>
                    {{ event.duration | msToTime }}
                  </td>
                  <td>
                    {{ event.tolerance | msToTime }}
                  </td>
                  <td>
                    <b>
                      <v-chip
                        color="info"
                        small
                        v-show="
                          getEventState(event.datetime, event.duration) == 0
                        "
                      >
                        Pendiente
                      </v-chip>
                      <v-chip
                        color="success"
                        small
                        v-show="
                          getEventState(event.datetime, event.duration) == 1
                        "
                      >
                        En curso
                      </v-chip>
                      <v-chip
                        color="error"
                        small
                        v-show="
                          getEventState(event.datetime, event.duration) == 2
                        "
                      >
                        Finalizado
                      </v-chip>
                    </b>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { msToTime } from "@/utils/utils.js";
import { format, compareAsc, startOfDay, endOfDay } from "date-fns";
import VueClock from "@dangvanthanh/vue-clock";
import api from "@/services/api/assistances.js";
import apiEvents from "@/services/api/events.js";
export default {
  components: {
    VueClock,
  },
  filters: {
    formatDate: function(value) {
      return format(new Date(value), "dd/MM/yyyy");
    },
    formatHour: function(value) {
      return format(new Date(value), "HH:mm:ss a");
    },
    msToTime: (milliseconds) => {
      return msToTime(milliseconds);
    },
  },
  data() {
    return {
      dni: "",
      // currentMember: null,
      assistances: [],
      events: [],
      activeEvent: null,
      assistanceState: null,
    };
  },
  async mounted() {
    this.$store.commit("loadingModule/showLoading");
    this.getMemberByDNI(this.user.dni);
    await this.initialData();
    this.getActiveEvent();
    this.assisted();
    this.$store.commit("loadingModule/showLoading", false);
  },
  computed: {
    user() {
      //from store
      return this.$store.state.authModule.user;
    },
  },
  methods: {
    assisted() {
      if (!this.activeEvent) return;
      console.log("las asistencias: ", this.assistances);
      this.assistanceState =
        this.assistances.findIndex(
          (assistance) => assistance.eventId._id === this.activeEvent._id
        ) > -1
          ? true
          : false;
    },
    getActiveEvent() {
      console.log("eventos activos: ", this.events);
      this.activeEvent = this.events.find(
        (event) => this.getEventState(event.datetime, event.duration) === 1
      );
    },
    async initialData() {
      try {
        //asistencias
        this.assistances = (
          await api.listAssistances(this.user._id)
        ).data.payload;
        //eventos
        this.events = (
          await apiEvents.listEvents(
            startOfDay(new Date()),
            endOfDay(new Date())
          )
        ).data.payload;
      } catch (err) {
        console.log("algo salio mal...", err);
      }
    },
    checkAssistance() {
      this.$store.commit("loadingModule/showLoading");
      api
        .saveAssistance({
          memberId: this.user._id,
          eventId: this.activeEvent._id,
        })
        .then((res) => {
          let msg = res.data.message;
          this.$store.commit("successModule/showSuccess", msg);
          console.log("se agregara: ", res.data.payload);
          this.assistances.unshift(res.data.payload);
          //assistence marked
          this.assisted();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => this.$store.commit("loadingModule/showLoading", false));
    },
    getMemberByDNI(dni) {
      var dni = parseInt(dni);
      this.currentMember = this.$store.getters["membersModule/getMemberByDNI"](
        dni
      );
    },
    randomDNI() {
      let membersLength = this.$store.state.membersModule.members.length;
      console.log(membersLength);
      this.dni = this.$store.state.membersModule.members[
        this.getRandomInt(0, membersLength - 1)
      ].dni;
      this.getMemberByDNI(this.dni);
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getEventState(datetime, duration) {
      // console.log(datetime, getTime(new Date(datetime)));
      let value = 0;
      let date = new Date(datetime);
      let begin = date.getTime();
      let end = date.getTime() + duration;
      let currentDate = new Date().getTime();
      if (currentDate < begin) value = 0;
      if (currentDate > begin && currentDate < end) value = 1;
      if (currentDate > end) value = 2;
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  // width: 100%;
}
.background {
  background-color: red;
}
.custom-margin {
  margin: auto;
}
.text-white {
  color: #ffffff;
}
.vertical-line {
  width: 1px; /* Line width */
  background-color: black; /* Line color */
  height: 100%; /* Override in-line if you want specific height. */
  float: left; /* Causes the line to float to left of content. 
        You can instead use position:absolute or display:inline-block
        if this fits better with your design */
}
.full-heigth {
  height: 100%;
  background-color: green;
}
.border-image {
  border-style: solid;
  border-width: 1px;
  border-color: #ffffff;
}
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
