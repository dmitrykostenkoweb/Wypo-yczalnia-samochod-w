<template>
  <div class="client-login__wrapper">
    <div class="client-login__inner">
      <span>Сześć 👋, zacznij pisać i wybierz swoje imię </span>
      <div class="client-login">
        <input
          placeholder="Login"
          v-model="inputName"
          type="text"
          autocomplete="off"
          @input="autocomplete"
        />
        <div class="client-login__autocomplete__wrapper">
          <div class="client-login__autocomplete">
            <li
              v-for="name in nameVariants"
              :key="name"
              class="client-login__autocomplete__item"
              @click="selected(name)"
            >
              {{ name }}
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/store";

export default defineComponent({
  setup(props, { emit }) {
    const store = useStore(key);

    //Search name
    const inputName = ref<string>("");
    const nameVariants = ref<string[]>([]);

    const autocomplete = () => {
      if (inputName.value) {
        nameVariants.value = store.getters.GET_NAMES.filter((name: string) => {
          return name.toLowerCase().includes(inputName.value.toLowerCase());
        });
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
      store.commit("SET_CLIENT_NAME", select);
      emit("login");
    };

    return { inputName, nameVariants, autocomplete, selected };
  },
});
</script>
<style scoped>
.client-login__wrapper {
  width: 100%;

  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
}
.client-login__inner {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
}
.client-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.client-login__autocomplete__wrapper {
  position: relative;
  width: 200px;
  z-index: 20;
}
.client-login__autocomplete {
  position: absolute;
  top: 0;
  left: 0;
}

.client-login__autocomplete__item {
  width: 200px;
  list-style: none;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: black;
}
.client-login__autocomplete__item :hover {
  background-color: rgba(151, 151, 151);
}
</style>
