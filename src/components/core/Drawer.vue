<template>
  <v-navigation-drawer color="#040505" dark v-model="drawer" app width="260">
    <v-list>
      <v-list-item>
        <v-img aspect-ratio="1.7" contain src="/images/mason.png"></v-img>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ user }}</v-list-item-title>
          <p class="text-center">{{ email }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mx-3 mb-3"></v-divider>
    <v-list nav flat>
      <template v-for="(item, i) in items">
        <v-list-item active-class="primary" :key="i" :to="{ name: item.to }">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-chart-bar",
          text: "Estadísticas",
          to: "statistics"
        },
        {
          icon: "mdi-account-card-details",
          text: "Miembros",
          to: "members"
        },
        {
          icon: "mdi-format-list-checks",
          text: "Postulantes",
          to: "postulants"
        },
        {
          icon: "mdi-format-list-checks",
          text: "test",
          to: "test"
        }
      ]
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.toolbar.drawerIcon;
      },
      set(newValue) {
        this.$store.state.toolbar.drawerIcon = newValue;
      }
    },
    user() {
      return this.$store.getters.getFullNameUser;
    },
    email() {
      return "Logia Masonica Francisco de Paula Gonzales Vigil";
    }
  }
};
</script>

<style lang="scss" scoped></style>
