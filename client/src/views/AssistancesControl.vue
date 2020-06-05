<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-card color="primary" width="800px">
        <v-row dense justify="center" align="center">
          <v-col cols="12" sm="5">
            <v-container fluid>
              <v-row justify="center">
                <v-icon size="250" color="white">mdi-clock-fast</v-icon>
              </v-row>
              <v-row justify="center">
                <vue-clock></vue-clock>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" sm="7">
                  <v-text-field
                    disabled
                    clearable
                    background-color="white"
                    outlined
                    placeholder="DNI"
                    hide-details
                    type="number"
                    v-model="user.dni"
                  ></v-text-field>
                  <!-- <v-btn x-small color="white" @click="randomDNI">random</v-btn> -->
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn color="info" large @click="checkAssistance"
                  >Marcar</v-btn
                >
              </v-row>
            </v-container>
          </v-col>
          <v-divider vertical color="white"></v-divider>
          <v-col cols="12" sm="5" class="text-sm-center">
            <v-container fluid>
              <v-img
                :src="user ? user.profile_picture : ''"
                class="custom-margin mb-3 border-image"
                contain
                width="200"
                height="150"
              ></v-img>
              <h2 class="text-white">Datos del miembro</h2>
              <p class="text-white">
                <b>Nombres:</b>
                {{ user ? user.first_name : "" }}
                {{ user ? user.last_name : "" }}
              </p>
              <p class="text-white">
                <b>DNI:</b>
                {{ user ? user.dni : "" }}
              </p>
              <p class="text-white">
                <b>Tipo:</b>
                {{ user ? user.rank : "" }}
              </p>
              <p class="text-white">
                <b>Hora de entrada:</b>
                {{ time.getHours() }}:{{ time.getMinutes() }}:{{
                  time.getSeconds()
                }}
              </p>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import VueClock from "@dangvanthanh/vue-clock";
export default {
  components: {
    VueClock,
  },
  data() {
    return {
      dni: "",
      // currentMember: null,
      time: new Date(),
    };
  },
  async mounted() {
    this.getMemberByDNI(this.user.dni);
  },
  computed: {
    user() {
      //from store
      return this.$store.state.authModule.user;
    },
  },
  methods: {
    getMemberByDNI(dni) {
      var dni = parseInt(dni);
      console.log(
        "miembro: ",
        this.$store.getters["membersModule/getMemberByDNI"](dni)
      );
      this.currentMember = this.$store.getters["membersModule/getMemberByDNI"](
        dni
      );
      this.time = new Date();
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
</style>
