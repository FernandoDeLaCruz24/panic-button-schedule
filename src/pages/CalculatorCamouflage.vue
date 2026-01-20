<template>
  <v-container class="py-6" style="max-width: 520px">
    <v-card rounded="xl" elevation="2">
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-calculator" class="mr-2" />
        Calculadora
        <v-spacer />
        <v-chip size="small" variant="tonal">v1.0</v-chip>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="display" variant="outlined" density="comfortable" readonly hide-details />

        <div class="mt-4 grid">
          <v-btn v-for="k in keys" :key="k" @click="press(k)" rounded="lg" size="large">
            {{ k }}
          </v-btn>
        </div>

        <v-alert class="mt-4" type="info" variant="tonal" density="compact">
          Tip: Puedes usar esta calculadora sin conexión.
        </v-alert>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snack.show" :timeout="2200">
      {{ snack.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEmergencyStore } from "../stores/emergency";

const store = useEmergencyStore();

const display = ref("0");
const snack = ref({ show: false, text: "" });

const keys = computed(() => [
  "7", "8", "9", "C",
  "4", "5", "6", "/",
  "1", "2", "3", "*",
  "0", ".", "#", "=",
]);

function reset() {
  display.value = "0";
}

function press(k) {
  if (k === "C") return reset();

  if (k === "=") {
    // “Easter egg” código SOS
    // Si el usuario escribió 911# y presiona =
    if (display.value === "911#") {
      triggerSecret();
      return reset();
    }

    // cálculo normal (básico)
    try {
      const safe = display.value.replace(/[^0-9+\-*/.()]/g, "");
      const result = Function(`"use strict"; return (${safe || "0"});`)();
      display.value = String(result);
    } catch {
      display.value = "Error";
    }
    return;
  }

  // agrega carácter
  if (display.value === "0" || display.value === "Error") display.value = "";
  display.value += k;
}

async function triggerSecret() {
  await store.triggerSos({
    channel: "calculator_code",
    reason: "Activación oculta desde Calculadora",
  });

  snack.value = {
    show: true,
    text: store.discreetMode ? "Acción registrada." : "Evento enviado.",
  };
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>
