// Prepends Vite's base URL so images work on both dev and GitHub Pages
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const img = (path) => `${base}${path}`;
