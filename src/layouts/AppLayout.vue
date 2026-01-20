<template>
  <v-app>
    <v-app-bar density="comfortable">
      <SecretLogoTap @secret="onSecretLogoTrigger" />

      <v-app-bar-title class="text-truncate">
        Portal Académico
      </v-app-bar-title>

      <v-spacer />

      <v-btn icon :to="{ name: 'schedule' }" :aria-label="'Horario'">
        <v-icon icon="mdi-calendar" />
      </v-btn>

      <v-btn icon :to="{ name: 'calc' }" :aria-label="'Calculadora'">
        <v-icon icon="mdi-calculator" />
      </v-btn>

      <v-btn icon :to="{ name: 'settings' }" :aria-label="'Ajustes'">
        <v-icon icon="mdi-cog" />
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <SosDialog v-model="sosDialog" />

    <v-snackbar v-model="snack.show" :timeout="2500">
      {{ snack.text }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useEmergencyStore } from "../stores/emergency";
import SecretLogoTap from "../components/SecretLogoTap.vue";
import SosDialog from "../components/SosDialog.vue";

const store = useEmergencyStore();

const sosDialog = ref(false);
const snack = ref({ show: false, text: "" });

function onSecretLogoTrigger() {
  // Si está en modo discreto, no muestres algo evidente; solo abre dialog discretamente.
  sosDialog.value = true;

  if (store.discreetMode) {
    snack.value = { show: true, text: "Acción registrada." };
  } else {
    snack.value = { show: true, text: "Acceso rápido activado." };
  }
}
</script>
