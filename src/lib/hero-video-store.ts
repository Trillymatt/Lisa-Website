/**
 * Tiny shared store: whether the homepage hero is showing media — the poster
 * still or the footage itself. The transparent site header subscribes so it
 * only switches to light-on-dark text once that media (and its dark scrim) is
 * behind it — on the calm gradient fallback the header keeps its dark palette.
 */
let active = false;
const listeners = new Set<() => void>();

export function setHeroVideoActive(value: boolean) {
  if (active === value) return;
  active = value;
  listeners.forEach((listener) => listener());
}

export function subscribeHeroVideo(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getHeroVideoActive() {
  return active;
}

export function getHeroVideoServerSnapshot() {
  return false;
}
