<template>
  <v-list lines="two" density="comfortable">
    <v-list-subheader>Lunes</v-list-subheader>

    <v-list-item v-for="c in monday" :key="c.id" rounded="lg" class="mb-2" @pointerdown="(e) => onDown(e, c)"
      @pointerup="onUp" @pointercancel="onUp" @pointerleave="onUp">
      <template #prepend>
        <v-avatar variant="tonal">
          <v-icon :icon="c.icon" />
        </v-avatar>
      </template>

      <v-list-item-title class="font-weight-medium">
        {{ c.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ c.time }} · {{ c.room }}
      </v-list-item-subtitle>

      <template #append>
        <v-chip size="small" variant="tonal">{{ c.prof }}</v-chip>
      </template>
    </v-list-item>

    <v-divider class="my-4" />

    <v-list-subheader>Martes</v-list-subheader>
    <v-list-item v-for="c in tuesday" :key="c.id" rounded="lg" class="mb-2">
      <template #prepend>
        <v-avatar variant="tonal">
          <v-icon :icon="c.icon" />
        </v-avatar>
      </template>

      <v-list-item-title class="font-weight-medium">
        {{ c.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ c.time }} · {{ c.room }}
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["secret-longpress"]);

const monday = [
  { id: 1, name: "Cálculo I", time: "07:00–08:30", room: "A-203", prof: "Mtra. Reyes", icon: "mdi-function-variant" },
  { id: 2, name: "Programación", time: "09:00–10:30", room: "Lab 2", prof: "Ing. Salas", icon: "mdi-code-tags" },
  { id: 3, name: "Física", time: "11:00–12:30", room: "B-110", prof: "Dr. Luna", icon: "mdi-atom" },
];

const tuesday = [
  { id: 4, name: "Álgebra", time: "08:00–09:30", room: "A-105", icon: "mdi-math-compass" },
  { id: 5, name: "Ética", time: "10:00–11:30", room: "C-012", icon: "mdi-scale-balance" },
];

const SECRET_CLASS_NAME = "Cálculo I";
const HOLD_MS = 1500;

const holdTimer = ref(null);
const holding = ref(false);

function onDown(e, item) {
  // Solo activa long-press si es la materia “secreta”
  if (item?.name !== SECRET_CLASS_NAME) return;

  holding.value = true;
  clearTimeout(holdTimer.value);

  holdTimer.value = setTimeout(() => {
    if (!holding.value) return;
    emit("secret-longpress");
  }, HOLD_MS);
}

function onUp() {
  holding.value = false;
  clearTimeout(holdTimer.value);
}
</script>
