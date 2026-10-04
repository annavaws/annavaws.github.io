// Reads a colour token from globals.css for use in canvas and WebGL code.
// Client-only: call it inside effects or client-rendered components.
export function token(name: string, alpha?: number) {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
    .split(/\s+/)
    .join(", ");
  return alpha === undefined
    ? `rgb(${channels})`
    : `rgba(${channels}, ${alpha})`;
}
