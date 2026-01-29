<template>
  <v-app>
    <v-main>
      <router-view @open-sos="openSosDialog" />
    </v-main>

    <SosDialog v-model="sosDialog" />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import SosDialog from "../components/SosDialog.vue";

const sosDialog = ref(false);

const snackbar = ref({
  show: false,
  text: "",
  color: "success",
});

function openSosDialog() {
  sosDialog.value = true;
}
</script>
