<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, watch, computed } from 'vue'

const theme = ref<Theme>('light')
const isInitialized = ref(false)

const isDarkMode = computed(() => {
  if (theme.value === 'auto') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }
  return theme.value === 'dark'
})

const toggleTheme = () => {
  theme.value = isDarkMode.value ? 'light' : 'dark'
}

const setTheme = (newTheme: Theme) => {
  theme.value = newTheme
}

const updateHtmlClass = (dark: boolean) => {
  if (typeof document !== 'undefined') {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') as Theme | null
  const initialTheme = savedTheme || 'light'

  theme.value = initialTheme
  isInitialized.value = true

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryListener = (e: MediaQueryListEvent) => {
      if (theme.value === 'auto') {
        updateHtmlClass(e.matches)
      }
    }
    mediaQuery.addEventListener('change', mediaQueryListener)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined' && mediaQueryListener) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.removeEventListener('change', mediaQueryListener)
  }
})

watch([theme, isInitialized], ([newTheme, newIsInitialized]) => {
  if (newIsInitialized) {
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'auto') {
      if (typeof window !== 'undefined') {
        updateHtmlClass(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } else {
      updateHtmlClass(newTheme === 'dark')
    }
  }
})

provide('theme', {
  theme,
  isDarkMode,
  toggleTheme,
  setTheme,
})
</script>

<script lang="ts">
import { inject } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

export interface ThemeContext {
  theme: { value: Theme }
  isDarkMode: { value: boolean }
  toggleTheme: () => void
  setTheme: (newTheme: Theme) => void
}

export function useTheme(): ThemeContext {
  const theme = inject<ThemeContext>('theme')
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
</script>
