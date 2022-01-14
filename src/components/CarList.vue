<template>
  <div>
    <h1>Wybierz samochód</h1>
    <ul class="car-list">
      <li
        class="main-style"
        v-for="car in store.state.cars"
        :key="car.id"
        @click="selectedCar(car)"
      >
        <h2>{{ car.brand }}</h2>
        <div class="list-item">
          <span class="list-title">Cena za dobę:</span>
          <p style="color: green">{{ car.price }}pln</p>
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
            emit("selectCar", car);
            // store.state.count = 1;
          }
        }
      });
    };

    return { store, selectedCar, message };
  },
});
</script>
<style scoped>
h1 {
  text-align: center;
}
.car-list {
  padding: 0 10%;
  margin: 40px auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
}

.car-list li {
  width: 200px;
  height: 200px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;

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

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
}
.list-item p {
  font-weight: 600;
  text-transform: uppercase;
}
</style>
