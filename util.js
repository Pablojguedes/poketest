export function capitalize(name) {
  if (!name || typeof name !== "string") return;
  return name.charAt(0).toUpperCase() + name.slice(1);
}
