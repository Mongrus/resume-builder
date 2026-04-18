import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    activeTheme: 'classic'
  }),

  actions: {
    setTheme(themeId) {
      this.activeTheme = themeId
    }
  }
})
