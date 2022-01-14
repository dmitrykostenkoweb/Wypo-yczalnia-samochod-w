<template>
  <div class="section__wrapper">
    <label for="client">Сześć 👋, zacznij pisać i wybierz swoje imię </label>

    <input
      id="client"
      v-model="inputName"
      type="text"
      autocomplete="off"
      @input="autocomplete"
    />
    <div class="autocomplete-list__wrapper">
      <div class="autocomplete-list">
        <li
          v-for="name in nameVariants"
          :key="name"
          class="autocomplete-list__item"
          @click="selected(name)"
        >
          {{ name }}
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import ClientTypes from "../types/ClientTypes";

import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  setup() {
    const store = useStore(key);

    //Search name
    const inputName = ref<string>("");
    const nameVariants = ref<string[]>([]);
    const autocomplete = () => {
      if (inputName.value) {
        nameVariants.value = store.getters.getNames.filter(
          (name: string) => {
            return name.toLowerCase().includes(inputName.value);
          }
        );
      }
    };
    //number of autocompletes
    const numberOfOptions = 5;
    if (nameVariants.value.length > numberOfOptions) {
      nameVariants.value.splice(
        numberOfOptions,
        nameVariants.value.length - numberOfOptions
      );
    }
    //removal of autocompletes
    if (!inputName.value) {
      nameVariants.value = [];
    }
    //selected name
    const selected = (select: string) => {
      store.commit("setClientName", select);
    };

    return { inputName,  nameVariants, autocomplete, selected };
  },
});
</script>
<style scoped>
.section__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.autocomplete-list__wrapper {
  position: relative;
  width: 200px;
  z-index: 20;
}
.autocomplete-list {
  position: absolute;
  top: 0;
  left: 0;
}

.autocomplete-list__item {
  width: 200px;
  list-style: none;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: black;
}
.autocomplete-list__item :hover {
  background-color: rgba(151, 151, 151, 0.8);
}
</style>
