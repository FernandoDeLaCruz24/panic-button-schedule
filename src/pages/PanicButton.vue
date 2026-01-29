<template>
  <v-container fluid class="fill-height d-flex flex-column align-center justify-center text-center">
    <h1 class="mb-6">Botón de pánico</h1>

    <v-btn color="red" size="x-large" class="panic-btn" @click="$emit('open-sos')">
      <v-icon size="48">mdi-alert</v-icon>
      SOS
    </v-btn>
  </v-container>
</template>

<script setup>
defineEmits(['open-sos'])
</script>

<style scoped>
.panic-btn {
  width: 200px;
  height: 200px;
  border-radius: 100%;
  font-size: 32px;
}
</style>
