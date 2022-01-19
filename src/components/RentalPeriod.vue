<template>
  <div class="rp-wrapper">
    <h2>Wybierz okres wynajmu</h2>
    <div class="rp-date__wrapper">
      <span> Chcę wynająć samochód: </span>
      <input v-model.trim="startDate" class="main-style" type="date" /><span
        >i zwrócić:</span
      >
      <input v-model.trim="endDate" class="main-style" type="date" />
    </div>

    <p v-if="store.state.extraDays != 0" style="color: green">
      Dostajesz <span>{{ store.state.extraDays }}</span> dzień gratis, więc
      możesz go zwrócić
      <span style="color: rgb(255, 115, 0)"> {{ returnDay }} </span>
    </p>

    <p v-if="rentDays">
      Wynajmujesz samochód na
      <span>{{ rentDays }} </span>
      <span v-if="store.state.extraDays != 0">
        + {{ store.state.extraDays }}</span
      >
      dni
    </p>
    <span class="list-title">
      Wynajem samochodu na okres dłuższy niż 7 dni daje 1 dzień gratis, a
      wynajęcie więcej niż 30 dni da ci 3 dni gratis 🎉.
    </span>

    <p v-for="car in store.state.selectedCar" :key="car.id">
      <span v-if="store.state.toPay"
        >Do zapłaty: {{ store.state.toPay }} PLN</span
      >
    </p>
    <warning-message :message="message" v-if="message" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import { useStore } from "vuex";
import { key } from "../store/store";
import WarningMessage from "./WarningMessage.vue";

import CarTypes from "../types/CarTypes";

export default defineComponent({
  components: { WarningMessage },
  setup() {
    const store = useStore(key);
    //Warning message
    const message = ref<string>("");

    const warnMessage = (youMessage: string) => {
      message.value = youMessage;
      setTimeout(() => {
        message.value = "";
      }, 2000);
    };

    const startDate = ref<string>("");
    const endDate = ref<string>("");
    const rentDays = ref<number>();
    const returnDay = ref<string>();
    const pay = ref<number>();

    const check = () => {
      if (
        new Date(startDate.value) < new Date() ||
        new Date(endDate.value) < new Date() ||
        new Date(endDate.value) <= new Date(startDate.value)
      ) {
        warnMessage("zła data🤪");
        startDate.value = "";
        endDate.value = "";
        returnDay.value = "";
        return;
      }
    };

    const addDays = (date: string, days: number) => {
      let result = new Date(date);
      result.setDate(result.getDate() + days);

      returnDay.value = result.toLocaleString().slice(0, 10);
    };

    const calcRentDays = () => {
      check();
      if (!startDate.value || !endDate.value) {
        return;
      }

      rentDays.value = Math.round(
        Math.abs(
          new Date(startDate.value).valueOf() -
            new Date(endDate.value).valueOf()
        ) / 86400000
      );
      if (rentDays.value < 7) {
        store.state.extraDays = 0;
        addDays(endDate.value, 0);
      }
      if (rentDays.value >= 7) {
        store.state.extraDays = 1;
        addDays(endDate.value, 1);
      }
      if (rentDays.value >= 30) {
        store.state.extraDays = 3;
        addDays(endDate.value, 3);
      }

      store.commit("SET_RENT_DAYS", rentDays.value);
    };

    watch(startDate, calcRentDays);
    watch(endDate, calcRentDays);

    const payment = () => {
      let sum = 0;

      store.state.selectedCar.map((item: CarTypes) => {
        sum = item.price * store.state.rentalDays;
      });

      if (store.state.drivingExp < 4) {
        sum = sum + (sum / 100) * 20;
      }
      store.commit("SET_PAY_SUM", sum);
    };
    watch(rentDays, payment);
    return { store, startDate, endDate, rentDays, message, returnDay };
  },
});
</script>

<style scoped>
.rp-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 50px auto;
}
.rp-wrapper p {
  font-size: 20px;
  font-weight: 600;
}
h2 {
  margin: 16px auto;
}
.rp-date__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px auto;
}
.rp-date__wrapper span {
  font-size: 20px;
  font-weight: 600;
}
input[type="date"] {
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border: 0;
  padding: 1px 8px;
  color: rgb(255, 115, 0);
  box-shadow: none;
  background: inherit;
  cursor: pointer;
}
</style>
