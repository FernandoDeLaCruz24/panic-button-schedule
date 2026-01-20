<template>
  <div>
    <div v-if="store.history.length === 0" class="text-caption text-medium-emphasis">
      Sin actividad registrada.
    </div>

    <v-list v-else density="compact" lines="two">
      <v-list-item v-for="h in store.history.slice(0, 6)" :key="h.id" rounded="lg">
        <template #prepend>
          <v-avatar variant="tonal">
            <v-icon :icon="iconFor(h.channel)" />
          </v-avatar>
        </template>

        <v-list-item-title class="text-body-2">
          {{ store.discreetMode ? "Evento" : h.reason }}
        </v-list-item-title>

        <v-list-item-subtitle class="text-caption">
          {{ format(h.createdAt) }} · {{ h.status }}
          <span v-if="h.location"> · GPS ✅</span>
          <span v-else> · GPS ⚠️</span>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { useEmergencyStore } from "../stores/emergency";

const store = useEmergencyStore();

function format(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function iconFor(channel) {
  if (channel === "calculator_code") return "mdi-calculator-variant";
  if (channel === "schedule_longpress") return "mdi-calendar";
  if (channel === "secret_logo_dialog") return "mdi-school";
  return "mdi-alert-circle-outline";
}
</script>
