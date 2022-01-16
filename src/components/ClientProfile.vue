<template>
  <div
    class="client-profile"
    v-for="data in store.getters?.GET_CLIENT"
    :key="data.id"
  >
    <!-- Liczba dni -->
    <div v-if="store.state.rentalDays" class="client-profile__item">
      <span class="list-title">Liczba dni :</span>
      <span>{{ store.state.rentalDays }}</span>
    </div>

    <!-- samochód -->
    <div
      v-for="car in store.state.selectedCar"
      class="client-profile__item"
      :key="car.id"
    >
      <span class="list-title">Samochód :</span>
      <span>{{ car.brand }}</span>
    </div>

    <div class="client-profile__item">
      <p class="list-title">Imię i nazwisko:</p>
      <p>{{ data.fullName }}</p>
    </div>
    <div class="client-profile__item">
      <p class="list-title">Data wydania prawa jazdy:</p>
      <p>{{ data.drivingDate }}</p>
    </div>
    <div
      class="client-profile-popup main-style"
      v-if="store.state.drivingExp <= 4"
    >
      <span style="color: red" class="list-title"
        >Masz prawo jazdy mniej niż 4 lata</span
      >
      <p>
        Bardzo nam przykro ale cena za wynajem będzie o 20% większa i nie masz
        możliwości wypożyczenia premium auta .👶
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  setup() {
    const store = useStore(key);
    return { store };
  },
});
</script>

<style scoped>
.client-profile {
  position: relative;
  margin: 0 auto;
  width: 100vw;
  height: 100px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 32px;
}
.client-profile__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-weight: 600;
}
.client-profile-popup {
  position: absolute;
  top: 136px;
  right: 0;
  max-width: 400px;
  z-index: 100;
}
</style>
