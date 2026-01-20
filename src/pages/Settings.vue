<template>
  <v-container class="py-6" style="max-width: 900px">
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-shield-account" class="mr-2" />
            Privacidad y modo discreto
          </v-card-title>

          <v-card-text>
            <v-switch v-model="discreet" color="primary" inset label="Modo discreto (recomendado)"
              hint="Evita textos obvios en pantalla; usa mensajes neutrales." persistent-hint />

            <v-divider class="my-4" />

            <v-alert type="warning" variant="tonal">
              Este proyecto es solo frontend. El “envío” de SOS está simulado y se guarda en tu navegador.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-history" class="mr-2" />
            Historial local
          </v-card-title>

          <v-card-text>
            <SosHistory />

            <v-btn class="mt-4" variant="tonal" @click="clear">
              Limpiar historial
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useEmergencyStore } from "../stores/emergency";
import SosHistory from "../components/SosHistory.vue";

const store = useEmergencyStore();

const discreet = computed({
  get: () => store.discreetMode,
  set: (v) => store.setDiscreetMode(v),
});

function clear() {
  store.clearHistory();
}
</script>
