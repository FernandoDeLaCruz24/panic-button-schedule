<template>
  <v-container class="py-6" style="max-width: 900px">
    <v-row>
      <v-col cols="12" md="8">
        <v-card rounded="xl" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-calendar-month" class="mr-2" />
            Horario semanal
            <v-spacer />
            <v-chip size="small" variant="tonal">Campus: CDMX</v-chip>
          </v-card-title>

          <v-card-text>
            <ScheduleList @secret-longpress="onSecretLongPress" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card rounded="xl" elevation="2">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-bell-outline" class="mr-2" />
            Avisos
          </v-card-title>
          <v-card-text class="text-body-2">
            <div class="mb-2">• Reinscripciones: 26–30 enero</div>
            <div class="mb-2">• Talleres: seguridad digital (jueves)</div>
            <div>• Biblioteca: horario extendido</div>
          </v-card-text>
        </v-card>

        <v-card rounded="xl" elevation="2" class="mt-4">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-history" class="mr-2" />
            Actividad reciente
          </v-card-title>
          <v-card-text>
            <SosHistory />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snack.show" :timeout="2200">
      {{ snack.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useEmergencyStore } from "../stores/emergency";
import ScheduleList from "../components/ScheduleList.vue";
import SosHistory from "../components/SosHistory.vue";

const store = useEmergencyStore();
const snack = ref({ show: false, text: "" });

async function onSecretLongPress() {
  await store.triggerSos({
    channel: "schedule_longpress",
    reason: "Activación oculta desde Horario",
  });

  snack.value = {
    show: true,
    text: store.discreetMode ? "Acción registrada." : "Evento enviado.",
  };
}
</script>
