export async function getCurrentLocation({ timeoutMs = 8000 } = {}) {
  if (!("geolocation" in navigator)) {
    return {
      ok: false,
      error: "Geolocalización no disponible en este dispositivo.",
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          ok: true,
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
        });
      },
      (err) => {
        resolve({
          ok: false,
          error:
            err?.code === 1
              ? "Permiso de ubicación denegado."
              : err?.code === 2
                ? "Ubicación no disponible."
                : "Tiempo de espera agotado al obtener ubicación.",
        });
      },
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 5000 },
    );
  });
}

export function tryVibrate(pattern = [80, 40, 80]) {
  try {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    // ignore
  }
}
