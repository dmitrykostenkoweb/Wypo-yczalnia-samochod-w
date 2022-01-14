<template>
  <p class="main-style warning-mess">{{ message }}</p>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    message: {
      required: true,
      type: String as PropType<string>,
    },
  },
});
</script>

<style scoped>
.warning-mess {
  width: max-content;
  position: fixed;
  bottom: 5%;
  left: 5%;
  background-color: rgb(255, 87, 87);
  font-weight: 600;
  color: white;
}
</style>
