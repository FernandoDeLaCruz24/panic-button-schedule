import { defineStore } from "pinia";
import {
  appendHistory,
  loadHistory,
  clearHistory as clearHistoryStorage,
} from "../services/storage";
import { getCurrentLocation, tryVibrate } from "../services/location";

function nowISO() {
  return new Date().toISOString();
}

export const useEmergencyStore = defineStore("emergency", {
  state: () => ({
    discreetMode: true, // modo discreto por defecto
    campus: "Ciudad de México",
    lastSos: null,
    history: loadHistory(),
    isSending: false,
  }),
  actions: {
    setDiscreetMode(v) {
      this.discreetMode = !!v;
    },
    async triggerSos({ channel, reason } = {}) {
      if (this.isSending) return;

      this.isSending = true;
      tryVibrate([80, 40, 80, 40, 120]);

      const loc = await getCurrentLocation({ timeoutMs: 8000 });

      const entry = {
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        createdAt: nowISO(),
        campus: this.campus,
        channel: channel || "unknown",
        reason: reason || "SOS activado",
        location: loc.ok ? loc.coords : null,
        locationError: loc.ok ? null : loc.error,
        status: "queued", // en un backend real: queued -> sent -> received...
      };

      this.history = appendHistory(entry);
      this.lastSos = entry;

      // Simula “envío”
      await new Promise((r) => setTimeout(r, 700));
      entry.status = "sent";
      this.history = appendHistory({ ...entry, id: entry.id + "-sent-copy" }); // demo: deja rastro visible
    },
    clearHistory() {
      clearHistoryStorage();
      this.history = [];
      this.lastSos = null;
    },
  },
});
