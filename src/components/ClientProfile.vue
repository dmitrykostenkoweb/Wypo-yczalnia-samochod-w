<template>
  <div
    class="client-profile main-style"
    v-for="data in store.getters?.getClient"
    :key="data.id"
  >
    <div class="client-profile__item">
      <p class="list-title">Imię i nazwisko:</p>
      <p>{{ data.fullName }}</p>
    </div>
    <div class="client-profile__item">
      <p class="list-title">Data wydania prawa jazdy:</p>
      <p>{{ data.drivingDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ClientTypes from "../types/ClientTypes";
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
  margin: 0 auto;
  max-width: 400px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
}
.client-profile__item {
  display: flex;
  gap: 16px;
  font-weight: 600;
}
</style>
