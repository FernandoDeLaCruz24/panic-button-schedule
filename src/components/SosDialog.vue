<template>
  <v-dialog v-model="model" max-width="520">
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center">
        <v-icon :icon="store.discreetMode ? 'mdi-account-check' : 'mdi-alert'" class="mr-2" />
        <span>{{ store.discreetMode ? "Acciones rápidas" : "Emergencia" }}</span>
      </v-card-title>

      <v-card-text>
        <v-alert v-if="!store.discreetMode" type="error" variant="tonal" class="mb-4">
          Activar alerta de emergencia.
        </v-alert>

        <v-textarea v-model="reason" label="Nota" variant="outlined" rows="2"
          hint="En modo discreto, usa una nota neutral si lo prefieres." persistent-hint />

        <div class="d-flex gap-2 mt-4">
          <v-btn block size="large" :loading="store.isSending" @click="send"
            :variant="store.discreetMode ? 'tonal' : 'flat'" :color="store.discreetMode ? undefined : 'error'">
            {{ store.discreetMode ? "Registrar" : "Enviar SOS" }}
          </v-btn>

          <v-btn block size="large" variant="text" @click="model = false">
            Cerrar
          </v-btn>
        </div>

        <v-divider class="my-4" />

        <div class="text-caption">
          Activación oculta: 5 taps al logo · long-press en “Cálculo I” · código 911# en calculadora.
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEmergencyStore } from "../stores/emergency";

const props = defineProps({ modelValue: { type: Boolean, default: false } });
const emit = defineEmits(["update:modelValue"]);

const store = useEmergencyStore();
const reason = ref("");

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});

async function send() {
  await store.triggerSos({
    channel: "secret_logo_dialog",
    reason: reason.value?.trim() || "Activación desde acciones rápidas",
  });
  reason.value = "";
  model.value = false;
}
</script>

<style scoped>
.gap-2 {
  gap: 10px;
}
</style>
