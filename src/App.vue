<template>
  <div class="app">
    <header
      class="header main-style"
      :style="[store.state.drivingExp < 4 ? 'margin-bottom: 180px;' : 'margin-bottom: 0px;' ]"
    >
      <h1>Carsharing</h1>
      <client-login v-if="!store.state.clientName" @login="login" />
      <client-profile />
    </header>
    <car-list v-if="!selectCar" @selectCar="isSelectCar" />
    <rental-period v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CarList from "./components/CarList.vue";
import ClientTypes from "./types/ClientTypes";
import "./assets/global.css";
import ClientLogin from "./components/ClientLogin.vue";
import ClientProfile from "./components/ClientProfile.vue";
import RentalPeriod from "./components/RentalPeriod.vue";

import { useStore } from "vuex";
import { key } from "./store/store";

export default defineComponent({
  name: "App",
  components: {
    CarList,
    ClientLogin,
    ClientProfile,
    RentalPeriod,
  },

  setup() {
    const store = useStore(key);
    ///btn

    const calcDrivingExp = () => {
      if (store.getters.GET_NAMES) {
        let drivingDate = "";

        const a = store.state.clients.filter((item: ClientTypes) => {
          return item.fullName === store.state.clientName;
        });

        a.map((item: ClientTypes) => {
          drivingDate = item.drivingDate;
        });

        store.commit(
          "SET_DRIVING_EXP",
          Math.round(
            Math.abs(new Date().valueOf() - new Date(drivingDate).valueOf()) /
              86400000 /
              365
          )
        );
      }
    };
    const login = () => {
      calcDrivingExp();
      store.commit("CHANGE_CAR_STATUS");
    };

    const selectCar = ref<boolean>();
    const isSelectCar = () => {
      selectCar.value = true;
    };

    return {
      store,
      login,
      isSelectCar,
      selectCar,
    };
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap");
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-family: "Bungee Shade", cursive;
}
.header {
  width: 100%;
  border-radius: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-margin-bottom {
  margin-bottom: 200px;
}
</style>
