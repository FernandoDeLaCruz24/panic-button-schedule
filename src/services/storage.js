const KEY = "silent_sos_history_v1";

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function appendHistory(entry) {
  const history = loadHistory();
  history.unshift(entry);
  saveHistory(history);
  return history;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
