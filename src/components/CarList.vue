<template>
  <div>
    <h2>Wybierz samochód</h2>
    <ul class="car-list">
      <li
        style="cursor: pointer"
        class="main-style"
        v-for="car in store.state.cars"
        :key="car.id"
        @click="selectedCar(car)"
      >
        <h2>{{ car.brand }}</h2>
        <div class="list-item">
          <span class="list-title">Cena za dobę:</span>
          <div>
            <p
              :style="[
                store.state.drivingExp < 4
                  ? 'text-decoration: line-through; color: grey'
                  : 'text-decoration: none; color: green',
              ]"
            >
              {{ car.price }}pln
            </p>
            <p v-if="store.state.drivingExp < 4" style="color: green">
              {{ car.price + (car.price / 100) * 20 }}pln
            </p>
          </div>
        </div>
        <div class="list-item">
          <span class="list-title">Segment:</span>
          <p style="color: orange">{{ car.segment }}</p>
        </div>
        <div class="list-item">
          <span class="list-title">Rodzaj paliwa:</span>
          <p style="color: brown">{{ car.typeOfFuel }}</p>
        </div>
        <div v-if="!car.status" class="list-item">
          <span
            style="color: red; margin-top: 16px; text-align: center"
            class="list-title"
            >Sorry, ten samochód nie jest dostępny dla Ciebie 😟</span
          >
        </div>
      </li>
    </ul>
  </div>
  <warning-message :message="message" v-if="message" />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import CarTypes from "../types/CarTypes";
import WarningMessage from "./WarningMessage.vue";

import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  emits: ["selectCar"],
  components: { WarningMessage },
  setup(props, { emit }) {
    const store = useStore(key);
    //Warning message
    const message = ref<string>("");
    const warnMessage = (youMessage: string) => {
      message.value = youMessage;
      setTimeout(() => {
        message.value = "";
      }, 1000);
    };
    //Select car
    const selectedCar = (car: CarTypes) => {
      if (!store.state.clientName) {
        warnMessage("Wybierz swoje imię");
        return;
      }
      //
      store.state.cars.forEach((item: CarTypes) => {
        if (car.id === item.id) {
          if (!item.status) {
            warnMessage("Sorry, ten samochód nie jest dostępny dla Ciebie 😟");
          } else {
            store.commit("SET_SELECTED_CAR", car);
            emit("selectCar");
          }
        }
      });
    };

    return { store, selectedCar, message };
  },
});
</script>
<style scoped>
h2 {
  text-align: center;
  margin: 20px auto;
}
.car-list {
  padding: 0 5%;
  margin: 20px auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
}

.car-list li {
  width: 250px;
  height: 250px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  list-style-type: none;
}

.car-list li:hover {
  box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.3);
  transform: translate(-1px, 1px);
  background: white;
}
.car-list li:active {
  background: rgb(169, 203, 248);
}

.list-item h2 {
  text-transform: capitalize;
}


.list-item p {
  font-weight: 600;
  text-transform: uppercase;
}
</style>
