<template>
  <div class="app">
    <client-login v-if="!store.state.clientName" />
    <client-profile />
    <button class="main-style car-btn" @click="showCars">
      {{ showCarBtn }}
    </button>
    <car-list v-if="showCarList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CarList from "./components/CarList.vue";
import ClientTypes from "./types/ClientTypes";
import "./assets/global.css";
import ClientLogin from "./components/ClientLogin.vue";
import ClientProfile from "./components/ClientProfile.vue";

import { useStore } from "vuex";
import { key } from "./store/store";

export default defineComponent({
  name: "App",
  components: { CarList, ClientLogin, ClientProfile },
  setup() {
    const store = useStore(key);

    const calcDrivingExp = () => {
      if (store.getters.getName) {
        let drivingDate = "";

        const client = store.state.clients.filter((item: ClientTypes) => {
          return item.fullName === store.state.clientName;
        });

        client.map((item: ClientTypes) => {
          drivingDate = item.drivingDate;
        });

        store.commit(
          "setDrivingExp",
          Math.round(
            Math.abs(new Date().valueOf() - new Date(drivingDate).valueOf()) /
              86400000 /
              365
          )
        );
      }
    };

    const showCarList = ref<boolean>(false);
    const showCarBtn = ref<string>("Samochody");

    const showCars = () => {
      showCarList.value = !showCarList.value;
      if (showCarList.value == true) {
        showCarBtn.value = "Ukryć Samochody";
      } else {
        showCarBtn.value = "Samochody";
      }
      calcDrivingExp();
      store.commit("changeCarStatus");
    };

    return {
      store,
      showCarList,
      showCarBtn,
      showCars,
    };
  },
});
</script>

<style>
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
