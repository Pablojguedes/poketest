export function retrieve(STORAGE_KEY) {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function save(STORAGE_KEY, item) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
}
