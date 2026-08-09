import { useState, useEffect } from 'react'

const KEY = 'ecell-theme'

/* Light = the brutalist system, dark = the blended one. Both live in
   index.css as CSS variables; this only flips the attribute they key off. */
export const getTheme = () =>
  (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'dark'

export function setTheme(next) {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* private mode — theme just won't persist */
  }
  window.dispatchEvent(new Event('themechange'))
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

/* three.js materials take hex strings, not CSS vars, so scenes read these */
const SCENE = {
  dark: { ink: '#E8E8ED', muted: '#8A8A91', accent: '#E6002A' },
  light: { ink: '#0A0A0A', muted: '#0A0A0B', accent: '#E6002A' },
}

export const useSceneColors = () => SCENE[useTheme()]

export function useTheme() {
  const [theme, set] = useState(getTheme)

  useEffect(() => {
    const on = () => set(getTheme())
    window.addEventListener('themechange', on)
    return () => window.removeEventListener('themechange', on)
  }, [])

  return theme
}
