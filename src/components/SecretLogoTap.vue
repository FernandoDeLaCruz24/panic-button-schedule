<template>
  <v-btn icon class="mr-2" variant="text" @click="onTap" :aria-label="'Inicio'">
    <v-icon icon="mdi-school" />
  </v-btn>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["secret"]);

const taps = ref([]);
const WINDOW_MS = 2000;
const REQUIRED_TAPS = 5;

function onTap() {
  const now = Date.now();
  taps.value = taps.value.filter((t) => now - t <= WINDOW_MS);
  taps.value.push(now);

  if (taps.value.length >= REQUIRED_TAPS) {
    taps.value = [];
    emit("secret");
  }
}
</script>
